export const metadata = { title: 'Études de cas — Parlios' }
export default function Cases() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="h2">Études de cas</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {['E-commerce', 'Productivité', 'Fintech'].map(c => (
            <div key={c} className="card">
              <h3 className="font-semibold">{c}</h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">Résumé placeholder — remplacez par vos résultats.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
