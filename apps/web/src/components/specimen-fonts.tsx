"use client";

import { useEffect } from "react";

/**
 * Loads the type-specimen Google Fonts stylesheet after first paint. A plain
 * <link rel="stylesheet"> here would be render-blocking and push LCP out by a
 * full fonts.googleapis.com round trip; specimens are below the fold and swap
 * in fine (previewFontStack always declares system fallbacks).
 */
export function SpecimenFonts({ href }: { href: string }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
    return () => {
      link.remove();
    };
  }, [href]);
  return null;
}
