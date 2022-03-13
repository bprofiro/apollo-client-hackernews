import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Header } from '../../../../components/Header'
import { SideBar } from '../../../../components/SideBar'

type Props = {
  children: React.ReactNode
  title: string
}

export const DashboardLayout = ({ children, title }: Props) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1488} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
