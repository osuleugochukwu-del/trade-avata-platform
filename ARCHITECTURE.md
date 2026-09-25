# Trade Avata Platform Architecture — Prototype 1

## Purpose
This repository is a clean replacement for the earlier prototype. The earlier `Tradeavata` repository remains untouched and is treated as historical reference.

## Prototype 1 scope
Prototype 1 is intentionally limited to the public foundation:
- shared header/navigation
- responsive mobile navigation
- dark-first blue brand system
- light mode preference
- homepage
- products catalogue
- product detail
- tools
- learn public preview
- company
- FAQ
- contact/support
- login/register route placeholders
- legal routes
- 404 route
- GitHub Pages deployment workflow

## Dynamic model already planned
Products have separate concepts for:
- `visible`
- `showPrice`
- `availability`
- `featured`

This lets the production backend hide a product without deleting it and hide a price without hiding the product.

## Deferred until Prototype 1 is tested
- Firebase authentication
- Firestore
- Storage
- admin CRUD
- payments
- course progression
- comments/chat
- notifications
- translations
- market data

## Rule
No backend feature is added merely because it can be added. Each phase must pass a build, route, responsive and functional inspection before the next phase begins.
