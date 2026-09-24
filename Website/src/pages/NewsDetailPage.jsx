import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getNewsById } from '../api/client.js'

function formatDate(iso) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

function NewsDetailPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    getNewsById(id)
      .then((data) => {
        if (!active) return
        setItem(data)
        setStatus(data ? 'ready' : 'missing')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [id])

  return (
    <section className="section news-detail">
      <div className="section__inner section__inner--narrow">
        <p className="news-detail__back">
          <Link to="/aktualnosci">← Wróć do aktualności</Link>
        </p>

        {status === 'loading' && <p className="status">Ładowanie…</p>}
        {status === 'error' && (
          <p className="status status--error">Nie udało się pobrać aktualności.</p>
        )}
        {status === 'missing' && (
          <>
            <h1>Nie znaleziono</h1>
            <p className="section__lead">
              Ta aktualność nie istnieje lub została usunięta.
            </p>
            <Link className="btn btn--solid" to="/aktualnosci">
              Lista aktualności
            </Link>
          </>
        )}
        {status === 'ready' && item && (
          <article>
            <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
            <h1>{item.title}</h1>
            <p className="news-detail__summary">{item.summary}</p>
            <div className="news-detail__body">
              <p>{item.body}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default NewsDetailPage
