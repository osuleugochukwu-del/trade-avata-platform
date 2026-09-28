# Layer 2 Test Checklist

## Source checks
- [ ] Every planned public route exists.
- [ ] Shared layout uses `<slot />`.
- [ ] Astro imports use `astro/config`.
- [ ] No `@astrojs/firebase` dependency.
- [ ] Product visibility and price visibility are separate fields.
- [ ] Brand logo asset exists.
- [ ] Hero image asset exists.

## Build checks
- [ ] `npm install` succeeds in GitHub Actions.
- [ ] `npm run verify` succeeds.
- [ ] `npm run build` succeeds.
- [ ] Pages artifact is created.

## Browser checks
- [ ] Homepage desktop.
- [ ] Homepage mobile.
- [ ] Header navigation.
- [ ] Mobile navigation.
- [ ] Dark/light mode.
- [ ] Products grid.
- [ ] Product detail route.
- [ ] Tools page.
- [ ] Learn page.
- [ ] Product search/filter controls update the visible count.
- [ ] Company page.
- [ ] FAQ interaction.
- [ ] Contact form layout.
- [ ] Login/register routes.
- [ ] Legal routes.
- [ ] 404 route.
- [ ] Footer links.

## Deployment phase (later — do not deploy from this layer build)
- [ ] GitHub Pages deployment succeeds.
- [ ] Production URL loads.
- [ ] Assets load under repository base path.
- [ ] No blank pages.
- [ ] No broken internal links.

## Tools Center checks
- [ ] Desktop Tools navigation opens a categorized mega-menu on hover/focus.
- [ ] Mobile Tools navigation expands into categories without overwhelming the screen.
- [ ] `/tools/` search filters tools without page reload.
- [ ] `/tools/` category cards collapse visually when no matching tool remains.
- [ ] Individual tool URLs resolve under `/tools/[slug]/`.
- [ ] Position sizing, risk/reward, P&L, compounding, drawdown, margin, pip value and lot conversion calculations return expected default values.
- [ ] Technical-analysis, forex-table, market-data and economic-calendar widgets load only on their individual pages.
- [ ] Tool favorites and recent history remain local and do not block first render.
- [ ] Tool pages remain readable at mobile widths.

## Layer 3 checks

- [ ] Firebase web configuration is supplied through deployment environment variables.
- [ ] Email/password registration creates a user and profile document.
- [ ] Email/password login reaches `/account/`.
- [ ] Google sign-in works in the configured Firebase project.
- [ ] Password reset sends a reset email.
- [ ] Signed-out visitors are redirected from account pages.
- [ ] Account profile reads only the authenticated user's private data.
- [ ] Role display defaults safely to `user` when no role document exists.
- [ ] Admin/staff role records are not writable from the browser.
- [ ] Orders/entitlements/subscriptions/enrollments/progress are not client-writable.
- [ ] Firestore rules deploy without errors.
- [ ] Firestore indexes deploy without errors.
- [ ] Storage rules deny unapproved paths.
- [ ] No Firebase service-account secrets are present in source.
- [ ] Firebase-disabled state produces a readable configuration message rather than a blank page.

## Layer 5 — Admin + Business Control
- [ ] Sign in as admin and staff role
- [ ] Non-admin is denied admin workspace
- [ ] Product create/edit/delete
- [ ] Course create/edit/delete
- [ ] Article create/edit/delete
- [ ] User role changes
- [ ] Order list
- [ ] Announcement create/edit/delete
- [ ] Site settings and feature flags
- [ ] Audit log visibility
- [ ] Admin mobile navigation
- [ ] Firestore rules independently block unauthorized writes

## Final inspection additions
- [x] Learning Builder route/panel exists.
- [x] Module and lesson management uses Firestore subcollections.
- [x] Lesson content blocks can be arranged without editing source code.
- [x] Enrollments and product entitlements can be managed from admin control.
- [x] Subscriptions, support tickets and certificates are visible to admin/staff.
- [x] Published Firestore articles have a public reader route.
- [x] Only admin can write role documents; staff cannot grant admin access.
- [x] Audit logs are append-only from Firestore rules.
- [x] Key admin actions record audit entries.
- [ ] Final legal Terms, Privacy and Risk Disclosure wording must be reviewed before production launch.
- [ ] Production Astro build must be confirmed by a successful dependency install/build (local install timed out in this environment).
