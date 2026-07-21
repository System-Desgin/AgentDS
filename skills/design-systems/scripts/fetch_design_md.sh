#!/usr/bin/env sh
# Fetch an AgentDS artifact for a system slug.
# Usage: fetch_design_md.sh <slug> [design.md|tokens.json|tailwind.css|bundle.zip]
# Env:   AGENTDS_API overrides the API base URL.
set -eu

if [ "${1:-}" = "" ]; then
  echo "usage: $0 <slug> [artifact]" >&2
  exit 2
fi

API="${AGENTDS_API:-https://api.agent-ds.oday-bakkour.com}"
SLUG="$1"
ARTIFACT="${2:-design.md}"

case "$ARTIFACT" in
  design.md | tokens.json | tailwind.css | bundle.zip) ;;
  *)
    echo "unknown artifact: $ARTIFACT (use design.md, tokens.json, tailwind.css, or bundle.zip)" >&2
    exit 2
    ;;
esac

status=$(curl -sS -w '%{http_code}' -o "$ARTIFACT.tmp" "$API/v1/systems/$SLUG/$ARTIFACT") || {
  rm -f "$ARTIFACT.tmp"
  echo "network error fetching $SLUG/$ARTIFACT" >&2
  exit 1
}

case "$status" in
  200)
    mv "$ARTIFACT.tmp" "$ARTIFACT"
    echo "saved $ARTIFACT ($SLUG)"
    ;;
  404)
    rm -f "$ARTIFACT.tmp"
    echo "unknown system: $SLUG (list: $API/v1/systems)" >&2
    exit 1
    ;;
  429)
    rm -f "$ARTIFACT.tmp"
    echo "rate limited - retry later (see Retry-After header)" >&2
    exit 1
    ;;
  451)
    rm -f "$ARTIFACT.tmp"
    echo "$SLUG is reference-only for legal reasons; downloads are disabled" >&2
    exit 1
    ;;
  *)
    rm -f "$ARTIFACT.tmp"
    echo "unexpected HTTP $status fetching $SLUG/$ARTIFACT" >&2
    exit 1
    ;;
esac
