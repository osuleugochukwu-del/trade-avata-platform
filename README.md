# Trade Avata Platform — Prototype 1

Prototype 1 is the public foundation for the new Trade Avata platform. It deliberately keeps Firebase and commerce out of this first milestone so the visual and routing foundation can be tested before backend work begins.

## Pages
- `/`
- `/products/`
- `/products/[slug]/`
- `/tools/`
- `/learn/`
- `/company/`
- `/faq/`
- `/contact/`
- `/login/`
- `/register/`
- `/terms/`
- `/privacy/`
- `/risk-disclosure/`
- `/404`

## Design principles
- Trade Avata blue is the primary brand identity.
- Dark-first professional trading-tech visual language.
- White/light mode is supported through the theme token system.
- Mobile is treated as a first-class layout.
- Product visibility and price visibility are separate concepts in the prototype data model.
- Firebase-backed dynamic content is intentionally deferred to the next phase.

## Important
The generated hero artwork is included as `public/images/hero-laptop.png`. The high-resolution design reference is also kept in `design/trade-avata-blueprint-reference.png`. Replace production artwork later if needed.

## Verification
Run `npm run verify` for dependency-free static checks. The real Astro build is performed by GitHub Actions during deployment.
