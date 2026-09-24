import { useState } from 'react'

const NAV_LINKS = [
  { href: '#start', label: 'Start' },
  { href: '#o-strzelnicy', label: 'O strzelnicy' },
  { href: '#aktualnosci', label: 'Aktualności' },
  { href: '#kalendarz', label: 'Kalendarz' },
  { href: '#kontakt', label: 'Kontakt' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-logo" href="#start" onClick={closeMenu}>
          <span className="site-logo__mark" aria-hidden="true" />
          LOK Kościan
        </a>
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
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
