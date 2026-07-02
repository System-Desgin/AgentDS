# Prompts

Versioned prompt templates for `pipeline generate` (headless Claude Code) and
the interactive `/generate-system` command. Keeping them fixed + versioned makes
re-runs diff-stable (see `docs/04-DATA-SOURCES.md` §6).

- `official.md` — Official Systems prose generation from normalized tokens.
- `brand-look.md` — Brand Looks generation; **injects the mandatory disclaimer
  header** and describes only _observed_ patterns.

Rules baked into both:

- Input is normalized tokens + our own paraphrased usage summary. **Never** paste
  or quote official docs text into the output.
- Fixed section order; whole-file budget ~300–600 lines.
- Every color/typography claim references an existing token (the linter enforces
  refs).
- Output is plain markdown only — no HTML, scripts, or external embeds.
- Runtime is the owner's Claude Max plan; `ANTHROPIC_API_KEY` must stay unset.
