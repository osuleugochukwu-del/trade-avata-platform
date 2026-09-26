# Trade Avata Platform — Prototype 2

Trade Avata is being built as a lightweight trading-technology company platform for products, tools, applications, education and future solutions.

## Prototype 2 focus
This phase expands the public platform without turning the website into a large file repository.

- Product catalogue with category, platform, price and availability filters
- Product detail pages with an explicit delivery model
- External-delivery-ready links for cTrader Store, MQL5 Market and future software downloads
- Vimeo-ready course delivery metadata
- First working Position Size Calculator
- Performance-first public architecture
- Updated architecture documentation

## Delivery principle
Large or specialist assets should live where they are best delivered:

- Vimeo → course video
- cTrader Store → cTrader products
- MQL5 Market → MT4/MT5 products where appropriate
- External/private storage → large software installers
- Trade Avata → catalogue, account/access experience and lightweight web tools

Do not add real external product URLs until the corresponding live product URL is supplied and verified.

## Local verification
```bash
npm run verify
```

The archive is intentionally prepared before deployment. Local static checks are included; the real Astro production build and browser/deployment checks are reserved for the later deployment phase.

## Tools Center

The public tools architecture now uses a compact Tools Center at `/tools/` plus direct `/tools/[slug]/` pages. The header exposes a desktop mega-menu and mobile expandable categories. Lightweight calculators run locally; live market context is delegated to established widget providers where appropriate.
