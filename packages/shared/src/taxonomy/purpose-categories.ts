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

/** Type guard: is a string one of the fixed purpose categories? */
export function isPurposeCategory(value: string): value is PurposeCategory {
  return (PURPOSE_CATEGORIES as readonly string[]).includes(value);
}
