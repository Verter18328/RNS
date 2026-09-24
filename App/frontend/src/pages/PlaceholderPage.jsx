function PlaceholderPage({ title, description }) {
  return (
    <section className="panel-page">
      <h1>{title}</h1>
      <p className="panel-lead">{description}</p>
      <p className="panel-hint">Funkcje tej sekcji pojawią się wkrótce.</p>
    </section>
  )
}

export default PlaceholderPage
