import { useEffect, useMemo, useState } from 'react'
import { getEvents } from '../api/client.js'

const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd']

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

function toDayKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function mondayIndex(jsDay) {
  return jsDay === 0 ? 6 : jsDay - 1
}

function formatMonthTitle(date) {
  return new Intl.DateTimeFormat('pl-PL', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatTime(iso) {
  return new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

function EventsCalendar() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))
  const [selectedKey, setSelectedKey] = useState(() => toDayKey(new Date()))
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    const from = startOfMonth(cursor).toISOString()
    const to = endOfMonth(cursor).toISOString()

    setStatus('loading')
    getEvents({ from, to })
      .then((data) => {
        if (!active) return
        setEvents(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [cursor])

  const eventsByDay = useMemo(() => {
    const map = new Map()
    for (const event of events) {
      const key = toDayKey(new Date(event.starts_at))
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(event)
    }
    return map
  }, [events])

  const cells = useMemo(() => {
    const first = startOfMonth(cursor)
    const daysInMonth = endOfMonth(cursor).getDate()
    const offset = mondayIndex(first.getDay())
    const total = Math.ceil((offset + daysInMonth) / 7) * 7
    const result = []

    for (let i = 0; i < total; i += 1) {
      const dayNumber = i - offset + 1
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        result.push({ empty: true, key: `empty-${i}` })
        continue
      }
      const date = new Date(cursor.getFullYear(), cursor.getMonth(), dayNumber)
      const key = toDayKey(date)
      result.push({
        empty: false,
        key,
        dayNumber,
        hasEvents: eventsByDay.has(key),
        isToday: key === toDayKey(new Date()),
        isSelected: key === selectedKey,
      })
    }
    return result
  }, [cursor, eventsByDay, selectedKey])

  const selectedEvents = eventsByDay.get(selectedKey) ?? []

  const shiftMonth = (delta) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
  }

  return (
    <section id="kalendarz" className="section calendar">
      <div className="section__inner">
        <h2>Kalendarz wydarzeń</h2>
        <p className="section__lead">
          Treningi, zawody i szkolenia. Wybierz dzień, aby zobaczyć szczegóły.
        </p>

        <div className="calendar__panel">
          <div className="calendar__toolbar">
            <button type="button" className="calendar__nav" onClick={() => shiftMonth(-1)}>
              Poprzedni
            </button>
            <h3 className="calendar__month">{formatMonthTitle(cursor)}</h3>
            <button type="button" className="calendar__nav" onClick={() => shiftMonth(1)}>
              Następny
            </button>
          </div>

          <div className="calendar__weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar__grid" role="grid" aria-label="Kalendarz miesiąca">
            {cells.map((cell) =>
              cell.empty ? (
                <div key={cell.key} className="calendar__cell calendar__cell--empty" />
              ) : (
                <button
                  key={cell.key}
                  type="button"
                  className={[
                    'calendar__cell',
                    cell.hasEvents ? 'calendar__cell--event' : '',
                    cell.isToday ? 'calendar__cell--today' : '',
                    cell.isSelected ? 'calendar__cell--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setSelectedKey(cell.key)}
                  aria-pressed={cell.isSelected}
                  aria-label={`${cell.dayNumber}${cell.hasEvents ? ', są wydarzenia' : ''}`}
                >
                  <span>{cell.dayNumber}</span>
                  {cell.hasEvents && <span className="calendar__dot" aria-hidden="true" />}
                </button>
              ),
            )}
          </div>

          <div className="calendar__details">
            <h4>
              {new Intl.DateTimeFormat('pl-PL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              }).format(new Date(`${selectedKey}T12:00:00`))}
            </h4>

            {status === 'loading' && <p className="status">Ładowanie wydarzeń…</p>}
            {status === 'error' && (
              <p className="status status--error">Nie udało się pobrać wydarzeń.</p>
            )}
            {status === 'ready' && selectedEvents.length === 0 && (
              <p className="status">Brak wydarzeń w tym dniu.</p>
            )}
            {status === 'ready' && selectedEvents.length > 0 && (
              <ul className="calendar__events">
                {selectedEvents.map((event) => (
                  <li key={event.id}>
                    <p className="calendar__event-time">
                      {formatTime(event.starts_at)}
                      {event.ends_at ? ` – ${formatTime(event.ends_at)}` : ''}
                    </p>
                    <h5>{event.title}</h5>
                    <p>{event.description}</p>
                    {event.location && <p className="calendar__event-loc">{event.location}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsCalendar
