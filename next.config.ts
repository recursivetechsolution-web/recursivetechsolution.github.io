import type { NextConfig } from "next";

// The site is hosted on GitHub Pages, which only serves static files.
// `output: "export"` makes `next build` write plain HTML/CSS/JS to `out/`.
// The existing pages (about.html, careers.html, ...) live in `public/` and
// are copied to `out/` unchanged, so every current URL keeps working.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
