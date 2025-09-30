export const metadata = { title: 'Contact — Parlios' }
export default function Contact() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="h2 mb-6">Contact</h1>
        <form name="contact" method="POST" data-netlify="true" className="grid md:grid-cols-2 gap-6 card">
          <input type="hidden" name="form-name" value="contact" />
          <label className="flex flex-col gap-2">
            <span>Nom</span>
            <input className="border rounded-xl px-3 py-2 bg-white/70 dark:bg-gray-950/70" name="name" required />
          </label>
          <label className="flex flex-col gap-2">
            <span>Email</span>
            <input type="email" className="border rounded-xl px-3 py-2 bg-white/70 dark:bg-gray-950/70" name="email" required />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span>Message</span>
            <textarea rows={6} className="border rounded-xl px-3 py-2 bg-white/70 dark:bg-gray-950/70" name="message" required />
          </label>
          <div className="md:col-span-2">
            <button className="btn btn-primary" type="submit">Envoyer</button>
          </div>
        </form>
      </div>
    </main>
  )
}
