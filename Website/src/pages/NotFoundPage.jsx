import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="section__inner section__inner--narrow">
        <p className="not-found__code">404</p>
        <h1>Strona nie istnieje</h1>
        <p className="section__lead">
          Sprawdź adres lub wróć na stronę główną strzelnicy LOK Kościan.
        </p>
        <Link className="btn btn--solid" to="/">
          Strona główna
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
