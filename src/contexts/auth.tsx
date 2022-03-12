import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN, USER_DATA } from '../common/constants/auth'
import { useSigInUser } from '../hooks/graphql/mutations/useSignInUser'
import { useSigUpUser } from '../hooks/graphql/mutations/useSignUpUser'

type User = {
  id: string
  name: string
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type SignUpCredentials = {
  name: string
  email: string
  password: string
}

type AuthContextData = {
  signOut: () => void
  signIn: (creadentials: SignInCredentials) => Promise<void>
  signUp: (creadentials: SignUpCredentials) => Promise<void>
  isAutchenticated: boolean
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signInMutation] = useSigInUser()
  const [signUpMutation] = useSigUpUser()
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem(USER_DATA)

    if (storedUser) {
      return JSON.parse(storedUser)
    }

    return {} as User
  })
  const isAutchenticated = !!user

  const navigate = useNavigate()

  const signOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    navigate('/sign-in')
  }

  const signUp = async ({ email, password, name }: SignUpCredentials) => {
    try {
      signUpMutation({
        variables: {
          name: name,
          email: email,
          password: password
        },
        onCompleted: ({ signup }) => {
          setUser({ id: signup.user.id, email, name })
          localStorage.setItem(AUTH_TOKEN, signup.token)
          localStorage.setItem(
            USER_DATA,
            JSON.stringify({ id: signup.user.id, email, name })
          )
        }
      })

      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      signInMutation({
        variables: {
          email,
          password
        },
        onCompleted: ({ login }) => {
          setUser({ id: login.user.id, email, name: login.user.name })
          localStorage.setItem(AUTH_TOKEN, login.token)
          localStorage.setItem(
            USER_DATA,
            JSON.stringify({ id: login.user.id, email, name: login.user.name })
          )
        }
      })

      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAutchenticated, signIn, user, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
