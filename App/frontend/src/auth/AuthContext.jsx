import { createContext, useContext, useMemo, useState } from 'react'
import { PERMISSIONS } from './permissions.js'

const STORAGE_KEY = 'rns-app-auth'
const AuthContext = createContext(null)

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'root'

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  const value = useMemo(() => {
    const login = (username, password) => {
      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        const nextUser = {
          username: ADMIN_USER,
          permissions: [PERMISSIONS.SITE, PERMISSIONS.COMPETITIONS],
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
        setUser(nextUser)
        return { ok: true }
      }
      return { ok: false, error: 'Nieprawidłowy login lub hasło.' }
    }

    const logout = () => {
      sessionStorage.removeItem(STORAGE_KEY)
      setUser(null)
    }

    const hasPermission = (permission) =>
      Boolean(user?.permissions?.includes(permission))

    return {
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      hasPermission,
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth musi być użyty wewnątrz AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
