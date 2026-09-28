# Trade Avata — My Trading Complete Module

This package is the **complete My Trading interface module** discussed for the current Trade Avata website.

## What is included

- Dashboard
- Accounts / Connect Account
- Performance / financial analysis
- Full Trades
- Trading Calendar
- Strategies
- Risk
- Bookkeeping
- Trade Avata Insights
- Reports
- Download Center
- PDF download actions
- Spreadsheet/CSV download actions
- Complete-account download
- Desktop sidebar
- Mobile horizontal navigation/cards
- Mobile bottom navigation
- PWA manifest + service worker
- Existing Astro BaseLayout integration
- Existing `BASE_URL` support

## Important

This is a **drop-in website module**, not a replacement for the entire Trade Avata public website.

The UI uses demo values so the interface can render immediately. The Connect/Sync buttons are placeholders for the real account connector layer.

## Install into the existing Astro website

1. Unzip this package.
2. Copy the contents into the root of the existing `trade-avata-platform` repository.
3. Keep your existing `src/layouts/BaseLayout.astro`.
4. Keep your existing Firebase/auth/public pages.
5. Do NOT delete the existing Tools or other public pages.
6. The package adds:
   - `src/pages/my-trading/index.astro`
   - `public/my-trading-manifest.webmanifest`
   - `public/my-trading-sw.js`
7. Run:
   `npm install`
   `npm run build`
8. Test locally:
   `npm run dev`
9. Open:
   `/my-trading/`
10. After committing/pushing, the GitHub Pages route should follow the site's configured base URL, e.g. `/trade-avata-platform/my-trading/`.

## Keeping everything synced

The module uses:
`const base = import.meta.env.BASE_URL;`

That means it follows the same Astro base path as the existing site rather than hard-coding a separate website.

## Production data layer

The UI is ready to receive real normalized data. The next layer should connect:
CSV / cTrader / MetaTrader / broker source
→ normalized account/trade data
→ analytics engine
→ these panels
→ PDF/CSV/XLSX exports.

Do not put broker secrets or Firebase service-account credentials in browser code.
