/**
 * Fixed purpose taxonomy (PRD §6.2). This list is a contract: the catalog
 * filters, category pages, and API `/v1/categories` all derive from it.
 * Adding a category is a deliberate change — update this list and the docs.
 */
export const PURPOSE_CATEGORIES = [
  "enterprise-dashboard",
  "dev-tools",
  "saas-product",
  "e-commerce",
  "docs-content",
  "marketing-site",
  "fintech",
  "government",
  "travel-consumer",
  "data-dense",
  "mobile-first",
  "tailwind-native",
] as const;

export type PurposeCategory = (typeof PURPOSE_CATEGORIES)[number];

/** Human-readable labels for UI (kept in sync with PURPOSE_CATEGORIES). */
export const PURPOSE_CATEGORY_LABELS: Record<PurposeCategory, string> = {
  "enterprise-dashboard": "Enterprise dashboard",
  "dev-tools": "Developer tools",
  "saas-product": "SaaS product",
  "e-commerce": "E-commerce",
  "docs-content": "Docs & content",
  "marketing-site": "Marketing site",
  fintech: "Fintech",
  government: "Government",
  "travel-consumer": "Travel & consumer",
  "data-dense": "Data-dense",
  "mobile-first": "Mobile-first",
  "tailwind-native": "Tailwind-native",
};

/** Search and landing-page copy for each stable catalog purpose. */
export const PURPOSE_CATEGORY_DESCRIPTIONS: Record<PurposeCategory, string> = {
  "enterprise-dashboard":
    "Design systems suited to operational tools, administration workflows, and complex enterprise products.",
  "dev-tools":
    "Design systems for developer tools, code-heavy workflows, documentation, and technical products.",
  "saas-product":
    "Design systems for multi-screen SaaS applications, account workflows, settings, and product navigation.",
  "e-commerce":
    "Design systems for product discovery, merchandising, checkout, and commerce operations.",
  "docs-content":
    "Design systems for documentation, editorial content, knowledge bases, and reading-focused interfaces.",
  "marketing-site":
    "Design systems and visual languages suited to product marketing, launches, and conversion-focused pages.",
  fintech:
    "Design systems for financial products where dense data, status, precision, and trust must remain legible.",
  government:
    "Design systems for public services, civic information, accessibility, and high-trust government interfaces.",
  "travel-consumer":
    "Design systems for travel, booking, marketplaces, and approachable consumer product experiences.",
  "data-dense":
    "Design systems that keep tables, dashboards, filters, and high-volume operational data understandable.",
  "mobile-first":
    "Design systems built around touch targets, compact screens, responsive hierarchy, and mobile interaction.",
  "tailwind-native":
    "Design systems whose tokens and component conventions map naturally to Tailwind CSS workflows.",
};

/** Type guard: is a string one of the fixed purpose categories? */
export function isPurposeCategory(value: string): value is PurposeCategory {
  return (PURPOSE_CATEGORIES as readonly string[]).includes(value);
}
