#!/usr/bin/env python3
"""Fetch and verify an AgentDS text artifact for a canonical system slug.

Usage: fetch_design_md.py <slug> [design.md|tokens.json|tailwind.css]
Env:   AGENTDS_API overrides the API base URL.
"""

import hashlib
import os
from pathlib import Path
import re
import sys
import tempfile
import urllib.error
import urllib.request

ARTIFACTS = ("design.md", "tokens.json", "tailwind.css")
SLUG_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")


def load_checksums() -> dict[str, str]:
    path = Path(__file__).resolve().parent.parent / "references" / "SHA256SUMS"
    checksums = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        digest, name = line.split(maxsplit=1)
        checksums[name] = digest
    return checksums


def main() -> int:
    if len(sys.argv) < 2:
        print(f"usage: {sys.argv[0]} <slug> [artifact]", file=sys.stderr)
        return 2
    slug = sys.argv[1]
    artifact = sys.argv[2] if len(sys.argv) > 2 else "design.md"
    if len(slug) > 64 or SLUG_PATTERN.fullmatch(slug) is None:
        print(
            "invalid slug: use at most 64 lowercase letters, digits, and single hyphens",
            file=sys.stderr,
        )
        return 2
    if artifact not in ARTIFACTS:
        print(f"unknown artifact: {artifact} (use one of {', '.join(ARTIFACTS)})", file=sys.stderr)
        return 2

    expected = load_checksums().get(f"{slug}/{artifact}")
    if expected is None:
        print(f"untrusted artifact: {slug}/{artifact} is not pinned by this skill version", file=sys.stderr)
        print("update or reinstall the AgentDS skill before fetching it", file=sys.stderr)
        return 1

    api = os.environ.get("AGENTDS_API", "https://api.agent-ds.oday-bakkour.com")
    url = f"{api}/v1/systems/{slug}/{artifact}"
    try:
        with urllib.request.urlopen(url, timeout=60) as response:
            data = response.read()
    except urllib.error.HTTPError as error:
        messages = {
            404: f"unknown system: {slug} (list: {api}/v1/systems)",
            429: "rate limited - retry later (see Retry-After header)",
            451: f"{slug} is reference-only for legal reasons; downloads are disabled",
        }
        print(messages.get(error.code, f"unexpected HTTP {error.code} fetching {url}"), file=sys.stderr)
        return 1
    except urllib.error.URLError as error:
        print(f"network error fetching {url}: {error.reason}", file=sys.stderr)
        return 1

    actual = hashlib.sha256(data).hexdigest()
    if actual != expected:
        print(f"integrity check failed for {slug}/{artifact}; file was not saved", file=sys.stderr)
        print(f"expected {expected} but received {actual}", file=sys.stderr)
        print("update or reinstall the AgentDS skill, then try again", file=sys.stderr)
        return 1

    target = Path(artifact)
    temporary_path = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="wb",
            dir=target.parent,
            prefix=f".{target.name}.",
            delete=False,
        ) as handle:
            temporary_path = Path(handle.name)
            handle.write(data)
        os.replace(temporary_path, target)
    finally:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)
    print(f"saved {artifact} ({slug}, sha256 verified)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
