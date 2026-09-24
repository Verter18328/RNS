import { useEffect, useState } from 'react'
import { getNews } from '../api/client.js'

function formatDate(iso) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

function NewsSection() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    getNews()
      .then((data) => {
        if (!active) return
        setItems(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="aktualnosci" className="section news">
      <div className="section__inner">
        <h2>Aktualności</h2>
        <p className="section__lead">
          Komunikaty ze strzelnicy i klubu — zawody, nabory i zmiany w grafiku.
        </p>

        {status === 'loading' && <p className="status">Ładowanie aktualności…</p>}
        {status === 'error' && (
          <p className="status status--error">Nie udało się pobrać aktualności.</p>
        )}

        {status === 'ready' && (
          <ul className="news__list">
            {items.map((item) => (
              <li key={item.id} className="news__item">
                <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default NewsSection
