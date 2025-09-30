import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="h1">Optimisez votre business avec des <span className="text-blue-600">agents IA</span> opérationnels</h1>
            <p className="lead mt-6">Parlios orchestre vos workflows, automatise vos tâches clés, et mesure l’impact — sans perdre en design ni en performance.</p>
            <div className="mt-8 flex gap-4">
              <Link className="btn btn-primary" href="/contact">Parler à un expert</Link>
              <a className="btn border border-gray-200 dark:border-gray-800" href="#offres">Voir les offres</a>
            </div>
          </div>
          <div className="card">
            <ul className="space-y-3 text-sm">
              <li>✅ Déploiement Netlify edge + ISR</li>
              <li>✅ Intégrations: Google, Notion, Supabase, Contentful, Sanity</li>
              <li>✅ CI/CD & logs (CREDIT_LOG, rapports)</li>
              <li>✅ Design system Tailwind prêt à l’emploi</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" className="section bg-gray-50 dark:bg-gray-900/30">
        <div className="container">
          <h2 className="h2 mb-8">Offres</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {title:'Starter', price:'Gratuit → PoC', points:['Landing + Form','1 workflow IA','Déploiement Netlify']},
              {title:'Pro', price:'à partir de 990$', points:['Front Next + Admin','3–5 workflows IA','Monitoring + KPI']},
              {title:'Scale', price:'sur devis', points:['Agents autonomes','Intégrations avancées','SLA + Support']},
            ].map((p) => (
              <div key={p.title} className="card">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-3xl font-extrabold mt-2">{p.price}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.points.map(pt => <li key={pt}>• {pt}</li>)}
                </ul>
                <a href="/contact" className="btn btn-primary mt-6">Demander</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sécurité */}
      <section id="securite" className="section">
        <div className="container">
          <h2 className="h2 mb-6">Sécurité & Données</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {title:'OAuth officiel prioritaire', desc:'Toujours privilégier OAuth/permissions granulaires.'},
              {title:'Secrets & CI/CD', desc:'Variables chiffrées GitHub + vérifications.'},
              {title:'Logs & traçabilité', desc:'CREDIT_LOG, artefacts, rapports, audit.'},
            ].map(card => (
              <div key={card.title} className="card">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intégrations */}
      <section id="integrations" className="section bg-gray-50 dark:bg-gray-900/30">
        <div className="container">
          <h2 className="h2 mb-6">Intégrations clés</h2>
        </div>
        <div className="container grid md:grid-cols-3 gap-6">
          {['Google','Notion','Supabase','Contentful','Sanity','n8n'].map(x => (
            <div key={x} className="card text-center">{x}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="h2">Prêt à lancer vos agents IA ?</h2>
          <p className="lead mt-3">On déploie un PoC en quelques heures, puis on fait monter en puissance.</p>
          <a href="/contact" className="btn btn-primary mt-6">Démarrer</a>
        </div>
      </section>
    </main>
  )
}
