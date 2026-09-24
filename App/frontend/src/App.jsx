import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import RequirePermission from './auth/RequirePermission.jsx'
import { PERMISSIONS } from './auth/permissions.js'
import Layout from './Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NewsAdminPage from './pages/NewsAdminPage.jsx'
import EventsAdminPage from './pages/EventsAdminPage.jsx'
import CompetitionsPage from './pages/CompetitionsPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function withPermission(permission, element) {
  return (
    <RequirePermission permission={permission}>{element}</RequirePermission>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route
                path="strona/aktualnosci"
                element={withPermission(PERMISSIONS.SITE, <NewsAdminPage />)}
              />
              <Route
                path="strona/wydarzenia"
                element={withPermission(PERMISSIONS.SITE, <EventsAdminPage />)}
              />
              <Route
                path="zawody"
                element={withPermission(PERMISSIONS.COMPETITIONS, <CompetitionsPage />)}
              />
              <Route
                path="zawody/rejestracja"
                element={withPermission(PERMISSIONS.COMPETITIONS, <RegistrationPage />)}
              />
              <Route
                path="zawody/wyniki"
                element={withPermission(PERMISSIONS.COMPETITIONS, <ResultsPage />)}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
