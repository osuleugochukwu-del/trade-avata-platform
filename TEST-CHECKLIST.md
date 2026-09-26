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
