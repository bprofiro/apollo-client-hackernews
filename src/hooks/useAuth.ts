import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuth most be used within a AuthProvider')
  }

  return context
}