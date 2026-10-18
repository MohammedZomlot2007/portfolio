import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const htmlFiles = [];
const failures = [];
const warnings = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
}

function reportFailure(message) {
  failures.push(message);
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

walk(root);
if (htmlFiles.length === 0) reportFailure("No HTML pages were found.");

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const localPath = path.relative(root, file).split(path.sep).join("/");
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
    ids.add(match[1]);
  }

  for (const match of html.matchAll(/\b(href|src)\s*=\s*["']([^"']*)["']/gi)) {
    const attr = match[1].toLowerCase();
    const raw = match[2].trim();
    if (!raw || raw === "#" || raw.startsWith("//")) continue;
    if (/^(?:https?:|mailto:|tel:|data:|blob:|javascript:|sms:)/i.test(raw)) continue;

    if (raw.startsWith("#")) {
      const fragment = safeDecode(raw.slice(1));
      if (fragment && !ids.has(fragment)) {
        warnings.push(`${localPath}: fragment "#${fragment}" is not a static id (it may be created dynamically)`);
      }
      continue;
    }

    const withoutHash = raw.split("#", 1)[0];
    const pathname = safeDecode(withoutHash.split("?", 1)[0]);
    if (!pathname) continue;

    let target;
    if (pathname.startsWith("/")) target = path.join(root, pathname.slice(1));
    else target = path.resolve(path.dirname(file), pathname);

    if (!target.startsWith(root + path.sep) && target !== root) {
      reportFailure(`${localPath}: ${attr} escapes repository root: ${raw}`);
      continue;
    }

    if (statSafe(target)?.isDirectory()) target = path.join(target, "index.html");
    if (!statSafe(target)) {
      reportFailure(`${localPath}: missing local ${attr} target: ${raw}`);
    }
  }
}

const manifestPath = path.join(root, "manifest.webmanifest");
if (statSafe(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    for (const icon of manifest.icons ?? []) {
      if (!icon.src) continue;
      const iconPath = path.resolve(root, icon.src.replace(/^\.\//, ""));
      if (!iconPath.startsWith(root + path.sep) || !statSafe(iconPath)) {
        reportFailure(`manifest.webmanifest: missing or unsafe icon source: ${icon.src}`);
      }
    }
  } catch (error) {
    reportFailure(`manifest.webmanifest: invalid JSON: ${error.message}`);
  }
}

const sitemapPath = path.join(root, "sitemap.xml");
if (statSafe(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  if (/YOUR-DOMAIN|example\.com/i.test(sitemap)) {
    reportFailure("sitemap.xml still contains a placeholder domain.");
  }
  const locs = [...sitemap.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1]);
  if (locs.length === 0) reportFailure("sitemap.xml contains no <loc> entries.");
  for (const loc of locs) {
    try {
      const url = new URL(loc);
      if (url.protocol !== "https:") reportFailure(`sitemap.xml URL must use HTTPS: ${loc}`);
      if (url.hostname !== "portfolio-mohammed-zomlot.vercel.app") {
        warnings.push(`sitemap.xml uses a different host: ${loc}`);
      }
    } catch {
      reportFailure(`sitemap.xml contains an invalid URL: ${loc}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} HTML pages and local assets.`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}
if (failures.length) {
  console.error(`Failures (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Local-page, asset, manifest, and sitemap checks passed.");
}

function statSafe(target) {
  try {
    return statSync(target);
  } catch {
    return null;
  }
}
