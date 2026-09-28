# Trade Avata Platform Architecture — Layer 4

## Direction
Trade Avata is a lightweight trading-technology company platform, not a large file warehouse.

The public site should remain fast while specialist services deliver large or platform-specific assets.

## Layer 2 scope
- Stronger public product catalogue
- Product categories and compact filters
- Explicit product delivery model
- External-delivery-ready product detail pages
- Public course preview/detail routes with Vimeo-ready delivery metadata
- Full public Tools Center with direct routes, favorites/recent history and focused tool pages
- Functional local calculators plus established-provider market widgets
- Clear separation between public catalogue and future account/access controls
- Performance-first public pages
- No deployment is required to advance this layer; deployment is a later validation phase after Layers 1–5 are built.

## External delivery model
Use the most appropriate delivery channel for each product:
- Video courses: Vimeo
- cTrader products: cTrader Store
- MT4/MT5 products: MQL5 Market where appropriate
- Large software installers: external/private download storage
- Lightweight web tools: run in the Trade Avata site when practical

The website stores catalogue metadata, customer experience, access rules and links. It should not bundle large videos, installers or specialist marketplace assets into the public site unless there is a specific reason.

## Future application/backend layers
Firebase is intended primarily for:
- users and profiles
- authentication
- roles and permissions
- purchases/orders
- entitlements
- course enrollment and progress
- subscriptions
- notifications
- site settings
- admin data
- audit/security records

Firebase Storage or another file service should only hold files that genuinely need protected storage. Do not automatically put every large asset there.

## Access model
Registration is not the same as paid membership.

A user may be:
1. Visitor
2. Registered user
3. Customer
4. Product owner / course student
5. Subscriber, where a subscription product exists
6. Admin or staff

Access is entitlement-based. Owning one course or product does not grant every other product.

## Performance rules
1. Public pages should not load private dashboard/admin code unnecessarily.
2. Avoid large media in the website bundle.
3. Avoid unnecessary third-party scripts.
4. Prefer local calculations for lightweight tools.
5. Keep client-side JavaScript small and scoped to the page that needs it.
6. Add backend calls only where dynamic data is genuinely required.

## Verification gate
Before moving to the next layer:
- static verification passes
- JavaScript syntax passes
- asset references pass
- production build passes in CI
- all routes load
- product filters work
- calculator works on mobile and desktop
- no large files are accidentally bundled
- GitHub Pages deployment succeeds
- deployed site is inspected on mobile and desktop

## Tools Center architecture

The public Tools experience is intentionally structured as a navigation system rather than one oversized dashboard.

- `/tools/` is the Tools Center with search, categories, quick access, saved tools and recently used tools.
- `/tools/[slug]/` provides a clean direct URL for every tool.
- Desktop uses a hover/focus mega-menu under Tools.
- Mobile uses expandable Tools and category sections.
- Simple calculators run locally in the browser with no backend dependency.
- Market-data tools use established third-party widgets where practical instead of Trade Avata becoming a market-data warehouse.
- Favorites and recent-tool history are browser-local in this layer; Firebase can synchronize them after the accounts layer is introduced.
- External widgets should be lazy-loaded or isolated to their individual tool pages so the Tools Center stays lightweight.

## Layer 3 — Accounts + Backend

Layer 3 adds the Firebase-backed account and data foundation without putting credentials or privileged operations in browser code.

### Included

- Firebase Web SDK integration with environment-based public configuration
- Email/password registration and login
- Google sign-in
- Password reset
- Authenticated account dashboard
- Profile settings
- User roles with admin/staff read model
- Firestore collections for products, courses, modules, lessons, enrollments, progress, entitlements, orders, subscriptions, announcements, notifications, certificates, articles, support tickets, audit logs, site settings and feature flags
- Firestore security rules with owner/admin boundaries
- Firestore indexes for account queries
- Storage rules prepared for protected user/admin assets
- Graceful configuration error when Firebase environment variables are absent

### Security boundary

The browser may contain the Firebase web configuration, but it must never contain service-account credentials or trusted payment/entitlement logic. Payment verification and entitlement issuance remain trusted-backend responsibilities.

Layer 3 does not attempt to finish the Layer 4 course engine or Layer 5 admin console. It establishes the authenticated data foundation those layers will use.


## Layer 4 — Learning + Product Access

Layer 4 adds the learning engine and entitlement-aware product/course experience while keeping the public site lightweight.

### Readable learning system
- Article-style lesson pages built from structured content blocks
- Paragraphs, headings, examples, callouts, warnings, key takeaways, lists, ordered steps, quotes, dividers, images/charts, resources, quizzes and optional video
- External HTTPS image URLs with alt text/captions so large images do not bloat the GitHub Pages bundle
- Vimeo-ready video blocks; videos remain external
- Public sample lessons for discoverability and previews
- Protected lesson content fetched from a dedicated Firestore lesson-content document after authentication, enrollment and previous-lesson checks

### Course access
- Course → module → lesson structure
- Enrollment-based access
- Lesson progress stored per user/course/module/lesson
- Resume/current lesson support through progress records
- Sequential unlocking enforced in the learning UI: the next lesson stays locked until the previous lesson is completed
- Completion tracking and progress percentage
- Account pages can link users back into their learning

### Product access
- Product entitlements remain separate from account registration
- Product delivery can remain external (cTrader Store, MQL5 Market, private download or web application)
- Protected product download/access links should be issued only after entitlement verification in a trusted backend flow

### Dynamic lesson URL strategy
Because the public site is deployed as static GitHub Pages, arbitrary future Firestore lessons cannot create new build-time Astro files. Layer 4 therefore uses a stable lesson reader route with query parameters for backend-driven lessons. This keeps the site static, lightweight and compatible with admin-created lessons later.

### Layer 4 content example
`firebase/seed/learning-content.example.json` documents the Firestore content shape without shipping protected course material into the public bundle.
