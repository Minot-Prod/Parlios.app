export const metadata = { title: 'Mentions légales — Parlios' }
export default function Legal() {
  return (
    <main className="section">
      <div className="container prose dark:prose-invert">
        <h1>Mentions légales</h1>
        <p>Parlios Inc. — Montréal, QC. Contact: {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@parlios.ca'}</p>
      </div>
    </main>
  )
}
