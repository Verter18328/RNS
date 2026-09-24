function isoDate(year, month, day, hour = 12, minute = 0) {
  const date = new Date(year, month - 1, day, hour, minute)
  return date.toISOString()
}

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const nextMonth = month === 12 ? 1 : month + 1
const nextYear = month === 12 ? year + 1 : year

export const news = [
  {
    id: 'news-1',
    title: 'Zapraszamy na otwarte treningi strzeleckie',
    summary:
      'W każdy weekend organizujemy otwarte treningi dla członków i sympatyków LOK Kościan.',
    body: 'Szczegóły zapisów i regulamin treningów dostępne na miejscu oraz u instruktorów dyżurnych.',
    published_at: isoDate(year, month, Math.max(1, now.getDate() - 5), 10, 0),
  },
  {
    id: 'news-2',
    title: 'Zawody o Puchar Burmistrza — zapowiedź',
    summary:
      'Trwają przygotowania do zawodów strzeleckich z okazji Święta Wojska Polskiego.',
    body: 'Zapisy oraz kategorie wiekowe ogłosimy w kolejnym komunikacie. Zapraszamy mieszkańców powiatu kościańskiego.',
    published_at: isoDate(year, month, Math.max(1, now.getDate() - 12), 14, 30),
  },
  {
    id: 'news-3',
    title: 'Młodzieżowy Klub Strzelecki — nabór',
    summary:
      'Rozpoczynamy nabór do Młodzieżowego Klubu Strzeleckiego LOK Kościan.',
    body: 'Zajęcia obejmują bezpieczeństwo, podstawy strzelectwa pneumatycznego i sportowego. Wymagany wiek: ukończone 13 lat.',
    published_at: isoDate(year, month, Math.max(1, now.getDate() - 20), 9, 0),
  },
  {
    id: 'news-4',
    title: 'Modernizacja stanowisk pneumatycznych',
    summary:
      'Zakończyliśmy drobne prace modernizacyjne na strzelnicy pneumatycznej 10 m.',
    body: 'Dziękujemy wolontariuszom i partnerom za wsparcie. Stanowiska są ponownie dostępne dla klubowiczów.',
    published_at: isoDate(year, month === 1 ? 12 : month - 1, 15, 11, 0),
  },
]

export const events = [
  {
    id: 'evt-1',
    title: 'Trening otwarty — kbks 50 m',
    description: 'Trening na osi 50 m. Broń i amunicję zapewnia organizator w ramach regulaminu.',
    starts_at: isoDate(year, month, Math.min(28, now.getDate() + 3), 16, 0),
    ends_at: isoDate(year, month, Math.min(28, now.getDate() + 3), 18, 0),
    location: 'Strzelnica LOK, Pl. Wolności 21',
  },
  {
    id: 'evt-2',
    title: 'Trening młodzieżowy — pneumatyka',
    description: 'Zajęcia Młodzieżowego Klubu Strzeleckiego na stanowiskach 10 m.',
    starts_at: isoDate(year, month, Math.min(28, now.getDate() + 7), 15, 0),
    ends_at: isoDate(year, month, Math.min(28, now.getDate() + 7), 17, 0),
    location: 'Strzelnica LOK, Pl. Wolności 21',
  },
  {
    id: 'evt-3',
    title: 'Dzień otwarty strzelnicy',
    description: 'Prezentacja obiektu, pokaz bezpiecznego strzelania i rozmowy z instruktorami.',
    starts_at: isoDate(year, month, Math.min(28, Math.max(1, now.getDate() + 14)), 10, 0),
    ends_at: isoDate(year, month, Math.min(28, Math.max(1, now.getDate() + 14)), 14, 0),
    location: 'Strzelnica LOK, Pl. Wolności 21',
  },
  {
    id: 'evt-4',
    title: 'Mini turniej ligi strzeleckiej',
    description: 'Krótki turniej weekendowy. Wpisowe i kategorie — informacje na miejscu.',
    starts_at: isoDate(nextYear, nextMonth, 8, 16, 0),
    ends_at: isoDate(nextYear, nextMonth, 8, 18, 30),
    location: 'Strzelnica LOK, Pl. Wolności 21',
  },
  {
    id: 'evt-5',
    title: 'Szkolenie BHP i regulamin',
    description: 'Obowiązkowe szkolenie dla nowych członków przed pierwszym treningiem.',
    starts_at: isoDate(nextYear, nextMonth, 15, 17, 0),
    ends_at: isoDate(nextYear, nextMonth, 15, 18, 30),
    location: 'Strzelnica LOK, Pl. Wolności 21',
  },
]
