import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel-page">
      <h1>404</h1>
      <p className="panel-lead">Nie znaleziono takiej strony w panelu.</p>
      <Link className="btn btn--primary" to="/">
        Pulpit
      </Link>
    </section>
  )
}

export default NotFoundPage
