
import Link from "next/link";
export default function Page(){
  return (
    <main>
      <section className="section container">
        <h1>Parlios — Ton premier employé IA</h1>
        <p className="lead">Optimise ton temps, libère ton potentiel. Réponses dans ta voix, contenus publiés, traces conservées.</p>
        <div style={{display:"flex", gap:"12px", marginTop:"16px"}}>
          <Link className="btn btn-primary" href="/modules">Essayer gratuitement</Link>
          <Link className="btn btn-ghost" href="/a-propos">Pourquoi Parlios ?</Link>
        </div>
      </section>
      <section className="section container">
        <h2>Sections clés</h2>
        <ul>
          <li><Link href="/modules">Modules gratuits</Link></li>
          <li><Link href="/offre">Offre & Pricing</Link></li>
          <li><Link href="/communaute">Communauté</Link></li>
          <li><Link href="/international">ADN international</Link></li>
          <li><Link href="/a-propos">À propos</Link></li>
          <li><Link href="/legal">Mentions & Disclaimer</Link></li>
        </ul>
      </section>
    </main>
  )
}
