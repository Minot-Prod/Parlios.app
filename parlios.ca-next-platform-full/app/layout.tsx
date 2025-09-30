import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Parlios — Optimisation, Automatisation & Agents IA',
  description: 'La plateforme qui orchestre vos agents IA et automatise votre business.',
  metadataBase: new URL('https://parlios.ca')
}

function GA() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return null
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js', new Date());gtag('config','${id}');`
      }} />
    </>
  )
}

function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-900 sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="font-extrabold text-xl">Parlios</a>
        <nav className="flex items-center gap-6 text-sm">
          <a href="/#offres">Offres</a>
          <a href="/#securite">Sécurité</a>
          <a href="/#integrations">Intégrations</a>
          <a href="/blog">Blog</a>
          <a href="/cases">Études</a>
          <a href="/contact" className="btn btn-primary">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-900">
      <div className="container py-10 text-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Parlios. Tous droits réservés.</p>
        <nav className="flex gap-4">
          <a href="/legal">Mentions légales</a>
          <a href="/privacy">Confidentialité</a>
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><GA /></head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
