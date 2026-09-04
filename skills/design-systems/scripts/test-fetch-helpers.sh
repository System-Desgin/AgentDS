#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../../.." && pwd)
TEST_ROOT=$(mktemp -d "${TMPDIR:-/tmp}/agentds-fetch-test.XXXXXX")
SERVER_ROOT="$TEST_ROOT/server"
SHELL_WORK="$TEST_ROOT/shell-work"
PYTHON_WORK="$TEST_ROOT/python-work"

cleanup() {
  if [ "${SERVER_PID:-}" != "" ]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -rf "$TEST_ROOT"
}
trap cleanup EXIT HUP INT TERM

digest() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | awk '{ print $1 }'
  else
    shasum -a 256 "$1" | awk '{ print $1 }'
  fi
}

mkdir -p "$SERVER_ROOT/v1/systems/carbon" "$SHELL_WORK" "$PYTHON_WORK"
cp "$REPO_ROOT/content/official/carbon/DESIGN.md" "$SERVER_ROOT/v1/systems/carbon/design.md"
cp "$REPO_ROOT/content/official/carbon/tokens.json" "$SERVER_ROOT/v1/systems/carbon/tokens.json"
cp "$REPO_ROOT/content/official/carbon/tailwind.css" "$SERVER_ROOT/v1/systems/carbon/tailwind.css"

PORT=$(python3 -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1]); s.close()')
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$SERVER_ROOT" >"$TEST_ROOT/server.log" 2>&1 &
SERVER_PID=$!

attempt=0
until curl -fsS "http://127.0.0.1:$PORT/v1/systems/carbon/design.md" >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo "test server did not start" >&2
    exit 1
  fi
  sleep 0.1
done

(
  cd "$SHELL_WORK"
  for artifact in design.md tokens.json tailwind.css; do
    source_name="$artifact"
    if [ "$artifact" = "design.md" ]; then source_name="DESIGN.md"; fi
    AGENTDS_API="http://127.0.0.1:$PORT" "$SCRIPT_DIR/fetch_design_md.sh" carbon "$artifact"
    cmp "$artifact" "$REPO_ROOT/content/official/carbon/$source_name"
  done
)

(
  cd "$PYTHON_WORK"
  for artifact in design.md tokens.json tailwind.css; do
    source_name="$artifact"
    if [ "$artifact" = "design.md" ]; then source_name="DESIGN.md"; fi
    AGENTDS_API="http://127.0.0.1:$PORT" python3 "$SCRIPT_DIR/fetch_design_md.py" carbon "$artifact"
    cmp "$artifact" "$REPO_ROOT/content/official/carbon/$source_name"
  done
)

if "$SCRIPT_DIR/fetch_design_md.sh" '../carbon' >/dev/null 2>&1; then
  echo "shell helper accepted an invalid slug" >&2
  exit 1
fi
if python3 "$SCRIPT_DIR/fetch_design_md.py" '../carbon' >/dev/null 2>&1; then
  echo "Python helper accepted an invalid slug" >&2
  exit 1
fi
if "$SCRIPT_DIR/fetch_design_md.sh" carbon bundle.zip >/dev/null 2>&1; then
  echo "shell helper accepted an unpinned bundle" >&2
  exit 1
fi
if python3 "$SCRIPT_DIR/fetch_design_md.py" carbon bundle.zip >/dev/null 2>&1; then
  echo "Python helper accepted an unpinned bundle" >&2
  exit 1
fi

cp "$REPO_ROOT/benchmarks/carbon-dashboard/prompt.txt" "$SERVER_ROOT/v1/systems/carbon/design.md"
shell_before=$(digest "$SHELL_WORK/design.md")
python_before=$(digest "$PYTHON_WORK/design.md")

if (cd "$SHELL_WORK" && AGENTDS_API="http://127.0.0.1:$PORT" "$SCRIPT_DIR/fetch_design_md.sh" carbon >/dev/null 2>&1); then
  echo "shell helper accepted a tampered artifact" >&2
  exit 1
fi
if (cd "$PYTHON_WORK" && AGENTDS_API="http://127.0.0.1:$PORT" python3 "$SCRIPT_DIR/fetch_design_md.py" carbon >/dev/null 2>&1); then
  echo "Python helper accepted a tampered artifact" >&2
  exit 1
fi

shell_after=$(digest "$SHELL_WORK/design.md")
python_after=$(digest "$PYTHON_WORK/design.md")
test "$shell_before" = "$shell_after"
test "$python_before" = "$python_after"

echo "fetch helpers: valid downloads verified; invalid slugs and tampered artifacts rejected"
