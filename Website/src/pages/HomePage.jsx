import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <section className="section home-intro">
        <div className="section__inner">
          <h2>Strzelnica w centrum Kościana</h2>
          <p className="section__lead">
            Liga Obrony Kraju prowadzi oś 50 m i stanowiska pneumatyczne —
            treningi, zawody i edukacja strzelecka dla mieszkańców powiatu.
          </p>
          <div className="home-intro__actions">
            <Link className="btn btn--solid" to="/aktualnosci">
              Aktualności
            </Link>
            <Link className="btn btn--outline" to="/kalendarz">
              Kalendarz
            </Link>
            <Link className="btn btn--outline" to="/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
