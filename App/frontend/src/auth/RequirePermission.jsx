import { useAuth } from './AuthContext.jsx'

function RequirePermission({ permission, children }) {
  const { hasPermission } = useAuth()

  if (!hasPermission(permission)) {
    return (
      <section className="panel-page">
        <h1>Brak dostępu</h1>
        <p className="panel-lead">
          Nie masz uprawnień do tej sekcji. Skontaktuj się z administratorem.
        </p>
      </section>
    )
  }

  return children
}

export default RequirePermission
