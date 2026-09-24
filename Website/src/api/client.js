import { events as seedEvents, news as seedNews } from '../data/seed.js'

/**
 * Warstwa danych w kształcie przyszłego API.
 * Później wystarczy podmienić implementacje na fetch(VITE_API_URL + '/api/...').
 */

export async function getNews() {
  const items = [...seedNews].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at),
  )
  return items
}

export async function getNewsById(id) {
  return seedNews.find((item) => item.id === id) ?? null
}

export async function getEvents({ from, to } = {}) {
  const fromTime = from ? new Date(from).getTime() : null
  const toTime = to ? new Date(to).getTime() : null

  return seedEvents
    .filter((event) => {
      const start = new Date(event.starts_at).getTime()
      if (fromTime !== null && start < fromTime) return false
      if (toTime !== null && start > toTime) return false
      return true
    })
    .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at))
}
