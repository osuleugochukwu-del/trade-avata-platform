# Prototype 1 Test Checklist

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

## Deployment checks
- [ ] GitHub Pages deployment succeeds.
- [ ] Production URL loads.
- [ ] Assets load under repository base path.
- [ ] No blank pages.
- [ ] No broken internal links.
