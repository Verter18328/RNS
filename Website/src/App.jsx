import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LeaguePage from './pages/LeaguePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="o-strzelnicy" element={<AboutPage />} />
          <Route path="aktualnosci" element={<NewsPage />} />
          <Route path="aktualnosci/:id" element={<NewsDetailPage />} />
          <Route path="kalendarz" element={<CalendarPage />} />
          <Route path="liga" element={<LeaguePage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
