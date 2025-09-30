# Parlios (Next Platform Starter)
Plateforme Next.js 14 (App Router) + Tailwind, prête pour Netlify.

## Démarrage local
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Déploiement Netlify
- Build: `npm run build`
- Publish: `.next`
- Plugin: `@netlify/plugin-nextjs` via `netlify.toml`
- Netlify Forms: page `/contact` (zéro backend)

## SEO
- `public/robots.txt` + `public/sitemap.xml`
- OG image: `public/og.png` à remplacer

## Config
- GA4: mettez `NEXT_PUBLIC_GA_ID` dans `.env.local`
- Email affiché: `NEXT_PUBLIC_CONTACT_EMAIL`

## Structure
- `app/` pages (Home, Blog, Cases, Legal, Privacy, Contact)
- `app/layout.tsx` inclut GA, Header, Footer
- `app/globals.css` design system Tailwind simple
