#!/usr/bin/env python3
"""Fetch an AgentDS artifact for a system slug.

Usage: fetch_design_md.py <slug> [design.md|tokens.json|tailwind.css|bundle.zip]
Env:   AGENTDS_API overrides the API base URL.
"""

import os
import sys
import urllib.error
import urllib.request

ARTIFACTS = ("design.md", "tokens.json", "tailwind.css", "bundle.zip")


def main() -> int:
    if len(sys.argv) < 2:
        print(f"usage: {sys.argv[0]} <slug> [artifact]", file=sys.stderr)
        return 2
    slug = sys.argv[1]
    artifact = sys.argv[2] if len(sys.argv) > 2 else "design.md"
    if artifact not in ARTIFACTS:
        print(f"unknown artifact: {artifact} (use one of {', '.join(ARTIFACTS)})", file=sys.stderr)
        return 2

    api = os.environ.get("AGENTDS_API", "https://api.agent-ds.oday-bakkour.com")
    url = f"{api}/v1/systems/{slug}/{artifact}"
    try:
        with urllib.request.urlopen(url) as response:
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

    with open(artifact, "wb") as handle:
        handle.write(data)
    print(f"saved {artifact} ({slug})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
