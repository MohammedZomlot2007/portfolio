# Mohammed Zomlot — Interactive Front-End Portfolio

A responsive, Arabic-first portfolio built with plain HTML, CSS, and JavaScript. It showcases interactive UI work, an experimental 3D lab, selected project case studies, and a printable résumé.

**Live site:** [portfolio-mohammed-zomlot.vercel.app](https://portfolio-mohammed-zomlot.vercel.app)  
**Profile:** [@MohammedZomlot2007](https://github.com/MohammedZomlot2007) · **X:** [@MohammedZoxt31](https://x.com/MohammedZoxt31) · **Email:** [mhzomlot@gmail.com](mailto:mhzomlot@gmail.com)

## Highlights

- Arabic RTL by default with an English/LTR toggle.
- Responsive page layouts and accessible keyboard focus states.
- Dark/light theme controls and reduced-motion handling.
- Interactive 3D background and a separate 3D lab with lazy-loaded browser graphics demos.
- Project timeline, Tradeon case study, résumé, and achievements pages.
- Progressive Web App manifest and a small same-origin service worker cache.
- Static frontend: no package installation or build step is required.

## Pages

| Path | Purpose |
| --- | --- |
| `index.html` | Main portfolio, services, skills, featured projects, and contact |
| `works.html` | Selected work and project case studies |
| `lab3d.html` | Interactive 3D graphics demos |
| `projects/tradeon.html` | Tradeon project overview |
| `resume.html` | Printable résumé |
| `achievements.html` | Achievements and selected milestones |

## Run locally

Use Node.js or Python's built-in static server from the repository root.

```bash
# Python
python -m http.server 8000

# Or Node (if the serve package is available)
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Deploy

The project can be deployed as static files to Vercel or another static host. The repository contains `vercel.json` for headers and URL behavior. For a new host, update `sitemap.xml` and the canonical/share metadata before publishing.

## Performance and compatibility notes

- The main background checks `prefers-reduced-motion`, supports a lighter FX mode, and falls back when WebGL or optional post-processing cannot initialize.
- The 3D lab loads its secondary engines as the demo section becomes visible; those demos depend on network access to their external CDNs.
- Test the published site on a touch device, a desktop browser, and with the browser's reduced-motion preference enabled before describing performance as verified.
- This repository is a static portfolio, not a package-managed application; browser-based visual checks remain important alongside code review.

## Quality checklist

- [ ] Check every navigation link and local page from the deployed URL.
- [ ] Verify profile images, CV download, and the project detail page load correctly.
- [ ] Test Arabic RTL and English LTR on desktop and mobile widths.
- [ ] Test the theme and FX toggles, keyboard navigation, and reduced-motion behavior.
- [ ] Open each 3D demo with network access blocked once to confirm a helpful fallback message appears.
- [ ] Re-run a link and asset check whenever local paths or pages change.

## Project integrity

Project descriptions distinguish portfolio concepts from integrated product work. No client counts, ratings, performance scores, or test results are claimed here unless they have been independently verified.
