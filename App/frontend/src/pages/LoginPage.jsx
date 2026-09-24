import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login(username.trim(), password)
    if (result.ok) {
      navigate(from, { replace: true })
      return
    }
    setError(result.error)
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="login-card__eyebrow">LOK Kościan</p>
        <h1>Panel</h1>
        <p className="login-card__lead">Zaloguj się, aby zarządzać stroną i zawodami.</p>

        <label className="field">
          <span>Login</span>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Hasło</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="login-card__error">{error}</p>}

        <button className="btn btn--primary" type="submit">
          Zaloguj
        </button>
      </form>
    </div>
  )
}

export default LoginPage
