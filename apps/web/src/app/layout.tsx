import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentDS — agent-ready design systems",
  description:
    "A free, curated catalog of agent-ready design system files (DESIGN.md + tokens) with previews and a public fetch API.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
