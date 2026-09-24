function Contact() {
  const mapUrl = 'https://maps.app.goo.gl/ziDvUKrzHGVKDhgL8'
  const facebookUrl = 'https://www.facebook.com/strzelnica.lok.koscian'

  return (
    <section className="section contact">
      <div className="section__inner">
        <h2>Kontakt</h2>
        <p className="section__lead">
          Zapraszamy na strzelnicę LOK w centrum Kościana.
        </p>
        <address className="contact__address">
          <p>
            <strong>Strzelnica LOK Kościan</strong>
          </p>
          <p>Pl. Wolności 21</p>
          <p>64-000 Kościan</p>
        </address>
        <div className="contact__actions">
          <a className="btn btn--primary" href={mapUrl} target="_blank" rel="noreferrer">
            Mapa dojazdu
          </a>
          <a className="btn btn--ghost" href={facebookUrl} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
