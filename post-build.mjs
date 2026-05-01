#!/usr/bin/env node
/**
 * post-build.mjs
 *
 * After `vite build`, call the SSR server to render a static index.html
 * into dist/client/. This allows the app to be deployed to Vercel as a
 * static site with SPA fallback routing.
 */
import { createServer } from "node:http";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "dist", "client", "index.html");

// Dynamically import the built SSR server
const { default: server } = await import("./dist/server/server.js");

// Call the fetch handler with a synthetic request for the root path
const request = new Request("http://localhost/");
const response = await server.fetch(request);
const html = await response.text();

writeFileSync(outPath, html, "utf-8");
console.log(`✓ pre-rendered index.html written to ${outPath}`);
