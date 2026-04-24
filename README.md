# Company Details Page

Next.js App Router implementation for the Transportvibe company-details experience.

## Route

- `src/app/company-details/page.tsx`
- Root `/` redirects to `/company-details`

## Architecture Summary

- Thin route: metadata + `loadCompanyDetailsPageData()` + section composition
- Typed data boundary:
  - `src/features/company-details/data/company-details.mock.json`
  - `src/features/company-details/data/load-company-details-page.ts`
  - `src/features/company-details/types/company-details-page.ts`
- Client islands only where needed:
  - section nav scroll spy
  - filters/dropdowns
  - gallery/lightbox modal
  - pagination
  - mobile overflow nav

## Development

```bash
npm run dev
npm run lint
```

## Planned post-v1

- **Phase 7**
  - Performance and audits: Lighthouse/axe bar
  - `next/image` sizes tuning
  - `dynamic()` splitting for heavier client islands
  - heading hierarchy audit
- **Phase 8**
  - Route resilience polish with `loading.tsx` / `error.tsx`
  - optional E2E coverage
- **Deferred capabilities**
  - Zod validation in the loader boundary
  - URL state sync via `nuqs`
  - CMS adapter for replacing static JSON
  - JSON-LD once content contracts are stable
