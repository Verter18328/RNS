function Hero() {
  return (
    <section id="start" className="hero">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Strzelnica · Liga Obrony Kraju</p>
        <h1 className="hero__brand">LOK Kościan</h1>
        <p className="hero__lead">
          Strzelectwo sportowe i szkolenia dla mieszkańców powiatu kościańskiego —
          bezpiecznie, lokalnie, razem.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#kalendarz">
            Zobacz kalendarz
          </a>
          <a className="btn btn--ghost" href="#aktualnosci">
            Aktualności
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
