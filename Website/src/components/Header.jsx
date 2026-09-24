import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Start', end: true },
  { to: '/o-strzelnicy', label: 'O strzelnicy' },
  { to: '/aktualnosci', label: 'Aktualności' },
  { to: '/kalendarz', label: 'Kalendarz' },
  { to: '/liga', label: 'Liga' },
  { to: '/kontakt', label: 'Kontakt' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/" onClick={closeMenu}>
          <span className="site-logo__mark" aria-hidden="true" />
          LOK Kościan
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
        <nav
          id="site-nav"
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          aria-label="Główna"
        >
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
