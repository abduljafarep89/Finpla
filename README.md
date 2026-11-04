# FinPlan (PWA) - build 1

Personal finance planner that runs in the browser and installs on your phone. Data stays on your device. Works side by side with Fintrak: separate storage, separate offline cache, same data format.

## Files
`index.html`, `style.css`, `app.js`, `sw.js`, `manifest.webmanifest`, 5 PNG icons, `fonts/` (Poppins and Lora, bundled so they work offline). `tests/`, `docs/`, `test_finplan.js` and this README are for you and not needed on the website.

## Put it on GitHub Pages
1. Create a new repository (for example `finplan`) and upload the website files above to the root.
2. Settings > Pages > Deploy from a branch > main / root.
3. Open `https://<username>.github.io/<repo>/` on your phone. Android Chrome: menu > Install app. iPhone Safari: Share > Add to Home Screen.

## Release an update
Change `BUILD` in `sw.js` and the two `?v=` numbers in `index.html`, upload, then open the app and close it fully twice.

## Look and feel (Settings > Appearance)
16 themes (8 light, 8 dark), 17 accent colours plus any custom colour from the colour palette, 6 fonts (System, Poppins, Lora, Rounded, Classic, Mono), 3 text sizes, 6 chart palettes, donut or bars.

## Data
See `docs/data-interchange.md`. Before using both apps on one web address, make the two edits in `docs/fintrak-patch.md` in Fintrak.

## Tests
`node test_finplan.js` (logic) and `python tests/browser_smoke.py` (layout, offline, install, backup, PIN, untick; needs `pip install playwright` and `python -m playwright install chromium`).
