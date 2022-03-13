import { Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'

type Props = {
  children: React.ReactNode
  title: string
}

export const AuthLayout = ({ children, title }: Props) => {
  const { isAutchenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAutchenticated) {
      navigate('/dashboard/1')
    }
  }, [isAutchenticated, navigate])

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Flex direction="column" h="100vh">
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </Flex>
  )
}
