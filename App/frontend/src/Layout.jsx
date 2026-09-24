import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.jsx'
import { PERMISSIONS } from './auth/permissions.js'

const NAV_GROUPS = [
  {
    label: 'Strona WWW',
    permission: PERMISSIONS.SITE,
    items: [
      { to: '/strona/aktualnosci', label: 'Aktualności' },
      { to: '/strona/wydarzenia', label: 'Wydarzenia' },
    ],
  },
  {
    label: 'Zawody',
    permission: PERMISSIONS.COMPETITIONS,
    items: [
      { to: '/zawody', label: 'Przegląd', end: true },
      { to: '/zawody/rejestracja', label: 'Rejestracja' },
      { to: '/zawody/wyniki', label: 'Wyniki' },
    ],
  },
]

function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()
  const { user, logout, hasPermission } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const visibleGroups = NAV_GROUPS.filter((group) => hasPermission(group.permission))

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__mark" aria-hidden="true" />
          <div>
            <strong>LOK Kościan</strong>
            <span>Panel</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Panel">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'admin-nav__link admin-nav__link--active' : 'admin-nav__link'
            }
          >
            Pulpit
          </NavLink>

          {visibleGroups.map((group) => (
            <div key={group.label} className="admin-nav__group">
              <p className="admin-nav__group-label">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        isActive
                          ? 'admin-nav__link admin-nav__link--active'
                          : 'admin-nav__link'
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__user">{user?.username}</p>
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            Wyloguj
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div key={location.pathname} className="page-enter">
          {outlet}
        </div>
      </main>
    </div>
  )
}

export default Layout
