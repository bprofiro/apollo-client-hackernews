import { Flex, Box } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  title: string
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <Flex direction="column" h="100vh">
      {/* <head>
        <title>{title} | Hackernews</title>
      </head> */}

      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </Flex>
  )
}
