# Fintrak (PWA) - build 34

Personal finance tracker that runs in the browser and installs on your phone. All data stays on your device.

## Files
`index.html`, `style.css`, `app.js`, `sw.js`, `manifest.webmanifest`, five PNG icons. `tests/` and `docs/` are for you and are not needed on the website.

## Put it on GitHub Pages
1. Upload the files above to the root of your repository (replace the old ones).
2. Settings > Pages > Deploy from a branch > main / root.
3. Open `https://<username>.github.io/<repo>/` on your phone. Android Chrome: menu > Install app. iPhone Safari: Share > Add to Home Screen.

## Releasing an update
Change `BUILD` in `sw.js` and the `?v=` number in `index.html` to the same new number, upload, then open the app and close it fully twice.

## Load your data from Fintrak
- **Same web address as before:** nothing to do. Your data is read automatically.
- **New address or new phone:** in the old app open Settings > Data Management and tap **Export / Share Backup** (or **Encrypted backup**). Send the file to the new phone, open the new app and tap **Load data from a Fintrak backup** (on the Welcome card, or in Settings).
- The app shows how many accounts, cards and entries the file has before it replaces anything. A safety copy of your current data is kept, and **Undo last load** in Settings puts it back.
- Older tracker backups and previously "protected" Fintrak backups can still be loaded.

## What changed in build 34
- Cash-flow bar shows "Over income by" instead of percentages above 100%, and prompts for a missing Salary amount.
- Tap targets are at least 40 px; every input has a label.
- PIN is stored as a salted hash and no longer appears in backups. An old plain PIN is converted on first start.
- Encrypted backups now use AES-GCM with a password. Old files still load.
- Backups are checked before loading; damaged entries are skipped and reported.
- Welcome card for an empty app, "Undo last load", and a switch to hide Home cards (Settings > Home screen cards).
- Service worker only manages Fintrak caches and matches files with or without `?v=`.
- Real-browser test added.

## Tests
`node test_fintrak.js` (logic) and `python tests/browser_smoke.py` (layout, offline, install, backup, PIN; needs `pip install playwright` and `python -m playwright install chromium`).

## Security notes
The 4-digit PIN keeps casual users out but does not encrypt the data stored on the phone, and a 4-digit PIN can be guessed by someone with technical access. Use an encrypted backup for files you share or store online.
