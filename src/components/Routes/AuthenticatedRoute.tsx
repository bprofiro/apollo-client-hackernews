import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type Props = {
  children: JSX.Element
}

export const AuthenticatedRoute = ({ children }: Props) => {
  const { isAutchenticated } = useAuth()
  const location = useLocation()

  if (!isAutchenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return children
}
