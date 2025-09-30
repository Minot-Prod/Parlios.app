
export default function Modules(){
  return (<main className="container section">
    <h1>Essayez gratuitement</h1>
    <div className="card" style={{marginTop:"1rem"}}>
      <h2>Évaluateur Titre & Accroche</h2>
      <p>Collez votre titre → score + tips + 3 variantes.</p>
      <input placeholder="Mon titre ici…" style={{width:"100%",padding:".75rem",borderRadius:"12px",background:"#162033",border:"1px solid rgba(255,255,255,.1)",color:"#EAF2FF"}}/>
    </div>
    <div className="card" style={{marginTop:"1rem"}}>
      <h2>Persona Express</h2>
      <p>Secteur, audience, offre → persona 1 page.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        <input placeholder="Secteur" style={{padding:".75rem",borderRadius:"12px",background:"#162033",border:"1px solid rgba(255,255,255,.1)",color:"#EAF2FF"}}/>
        <input placeholder="Audience" style={{padding:".75rem",borderRadius:"12px",background:"#162033",border:"1px solid rgba(255,255,255,.1)",color:"#EAF2FF"}}/>
        <input placeholder="Offre" style={{gridColumn:"1/3",padding:".75rem",borderRadius:"12px",background:"#162033",border:"1px solid rgba(255,255,255,.1)",color:"#EAF2FF"}}/>
      </div>
    </div>
    <div className="card" style={{marginTop:"1rem"}}>
      <h2>Détecteur de risques de clause</h2>
      <p>Repère 3 risques potentiels + reformulation. ⚠️ Info générale, ne remplace pas un conseil juridique.</p>
      <textarea placeholder="Collez la clause…" style={{width:"100%",height:"120px",padding:".75rem",borderRadius:"12px",background:"#162033",border:"1px solid rgba(255,255,255,.1)",color:"#EAF2FF"}}/>
    </div>
  </main>)
}
