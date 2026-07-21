/** Site-wide constants (production URLs come from CLAUDE.md). */
export const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://agent-ds.oday-bakkour.com";

/** Public API base — used for server fetches and user-facing "Copy API URL". */
export const API_URL =
  process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.agent-ds.oday-bakkour.com";

export const SITE_NAME = "AgentDS";
export const SITE_DESCRIPTION =
  "A free, curated catalog of agent-ready design system files (DESIGN.md + tokens) with previews and a public fetch API.";

export const INSTALL_COMMAND = "npx skills add System-Desgin/AgentDS --skill design-systems";

export const GITHUB_URL = "https://github.com/System-Desgin/AgentDS";
export const CONTACT_EMAIL = "contact@oday-bakkour.com";
