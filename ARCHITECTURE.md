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
- Paragraphs, headings, examples, callouts, lists, quotes, dividers, images and optional video
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

## Layer 5 — Admin + Business Control

Layer 5 completes the business-control surface for the platform. The admin UI is intentionally a client-side protected workspace because the public site remains a static Astro/GitHub Pages deployment. Firestore Security Rules remain the authoritative permission boundary.

### Included
- Protected admin/staff control centre
- Dashboard overview and operational counts
- Product catalogue CRUD
- Course catalogue CRUD
- Public learning article/content CRUD
- User list and role management
- Order visibility
- Announcement scheduling/content management
- Site settings and feature flags
- Audit-log viewer
- Responsive admin navigation for desktop and mobile
- External image URL support for content so large assets are not bundled into the site
- Explicit admin/staff role checks before the workspace loads

### Security boundary
- Admin UI checks the signed-in user's Firestore role before enabling the workspace.
- Firestore rules independently enforce admin/staff writes and private-data boundaries.
- The browser never receives a Firebase service account or privileged server credential.
- Payment verification, entitlement issuance and other trusted operations remain server-side responsibilities.
- Client-side role checks are UX gates only; they are not treated as the security boundary.

### Business-control principle
Routine catalogue/content/business changes should be possible from the admin workspace without editing source code. Static GitHub Pages still requires a rebuild for public Astro routes that are compiled into the site, while Firestore-backed content/settings can be changed without changing the repository.

## Final inspection corrections — Layer 5

The final inspection added the following controls:
- protected Learning Builder for course → module → lesson structure;
- visual lesson content-block editing for headings, paragraphs, examples, callouts, lists, images, video, quotes and dividers;
- admin access-control workspace for enrollments, product entitlements, subscriptions, support tickets and certificates;
- public article reader at `/articles/?slug=...` for published Firestore articles;
- role changes restricted at the Firestore rule boundary to `admin` accounts; staff retain operational control but cannot grant roles;
- append-only audit-log writes (updates/deletes denied);
- admin audit events for key business/control changes;
- external HTTPS media remains outside the public bundle.

Production note: legal Terms, Privacy and Risk Disclosure text still requires final business/legal review before public launch. This is intentionally not invented or treated as a technical pass.
