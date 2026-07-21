"use client";

/**
 * Last-resort boundary (errors in the root layout itself). Must render its own
 * <html>/<body>; styles are inline because globals.css may not have loaded.
 * Values mirror DESIGN.md tokens (surface, on-surface, accent, primary).
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          backgroundColor: "#FAF7F2",
          color: "#17150F",
          display: "flex",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "center",
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: 560, padding: 24 }}>
          <p style={{ color: "#BC4A26", fontFamily: "monospace", fontSize: 13 }}>## error</p>
          <h1 style={{ fontSize: 32, lineHeight: 1.2, margin: "8px 0 12px" }}>
            AgentDS hit an unexpected error.
          </h1>
          <p style={{ color: "#57503F", lineHeight: 1.6, margin: "0 0 20px" }}>
            Reload the page or try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              backgroundColor: "#17150F",
              border: 0,
              borderRadius: 10,
              color: "#FAF7F2",
              cursor: "pointer",
              fontSize: 16,
              padding: "12px 20px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
