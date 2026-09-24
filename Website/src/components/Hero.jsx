import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Strzelnica · Liga Obrony Kraju</p>
        <h1 className="hero__brand">LOK Kościan</h1>
        <p className="hero__lead">
          Strzelectwo sportowe i szkolenia dla mieszkańców powiatu kościańskiego —
          bezpiecznie, lokalnie, razem.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/kalendarz">
            Zobacz kalendarz
          </Link>
          <Link className="btn btn--ghost" to="/aktualnosci">
            Aktualności
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
