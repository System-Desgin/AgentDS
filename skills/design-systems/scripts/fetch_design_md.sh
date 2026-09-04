#!/usr/bin/env sh
# Fetch and verify an AgentDS text artifact for a canonical system slug.
# Usage: fetch_design_md.sh <slug> [design.md|tokens.json|tailwind.css]
# Env:   AGENTDS_API overrides the API base URL.
set -eu

if [ "${1:-}" = "" ]; then
  echo "usage: $0 <slug> [artifact]" >&2
  exit 2
fi

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
CHECKSUMS="$SCRIPT_DIR/../references/SHA256SUMS"
API="${AGENTDS_API:-https://api.agent-ds.oday-bakkour.com}"
SLUG="$1"
ARTIFACT="${2:-design.md}"

case "$SLUG" in
  "" | -* | *- | *--* | *[!a-z0-9-]*)
    echo "invalid slug: use lowercase letters, digits, and single hyphens" >&2
    exit 2
    ;;
esac

if [ "${#SLUG}" -gt 64 ]; then
  echo "invalid slug: maximum length is 64 characters" >&2
  exit 2
fi

case "$ARTIFACT" in
  design.md | tokens.json | tailwind.css) ;;
  *)
    echo "unknown artifact: $ARTIFACT (use design.md, tokens.json, or tailwind.css)" >&2
    exit 2
    ;;
esac

EXPECTED=$(awk -v target="$SLUG/$ARTIFACT" '$2 == target { print $1; exit }' "$CHECKSUMS")
if [ "$EXPECTED" = "" ]; then
  echo "untrusted artifact: $SLUG/$ARTIFACT is not pinned by this skill version" >&2
  echo "update or reinstall the AgentDS skill before fetching it" >&2
  exit 1
fi

umask 077
TMP_FILE=$(mktemp "./.${ARTIFACT}.XXXXXX")
trap 'rm -f "$TMP_FILE"' EXIT HUP INT TERM

STATUS=$(curl -sS --connect-timeout 10 --max-time 60 -w '%{http_code}' -o "$TMP_FILE" "$API/v1/systems/$SLUG/$ARTIFACT") || {
  echo "network error fetching $SLUG/$ARTIFACT" >&2
  exit 1
}

case "$STATUS" in
  200)
    if command -v sha256sum >/dev/null 2>&1; then
      ACTUAL=$(sha256sum "$TMP_FILE" | awk '{ print $1 }')
    elif command -v shasum >/dev/null 2>&1; then
      ACTUAL=$(shasum -a 256 "$TMP_FILE" | awk '{ print $1 }')
    else
      echo "integrity check unavailable: install sha256sum or shasum" >&2
      exit 1
    fi
    if [ "$ACTUAL" != "$EXPECTED" ]; then
      echo "integrity check failed for $SLUG/$ARTIFACT; file was not saved" >&2
      echo "expected $EXPECTED but received $ACTUAL" >&2
      echo "update or reinstall the AgentDS skill, then try again" >&2
      exit 1
    fi
    mv "$TMP_FILE" "$ARTIFACT"
    trap - EXIT HUP INT TERM
    echo "saved $ARTIFACT ($SLUG, sha256 verified)"
    ;;
  404)
    echo "unknown system: $SLUG (list: $API/v1/systems)" >&2
    exit 1
    ;;
  429)
    echo "rate limited - retry later (see Retry-After header)" >&2
    exit 1
    ;;
  451)
    echo "$SLUG is reference-only for legal reasons; downloads are disabled" >&2
    exit 1
    ;;
  *)
    echo "unexpected HTTP $STATUS fetching $SLUG/$ARTIFACT" >&2
    exit 1
    ;;
esac
