import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function Layout() {
  const location = useLocation()
  const outlet = useOutlet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="page">
      <Header />
      <main>
        <div key={location.pathname} className="page-enter">
          {outlet}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
