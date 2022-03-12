import { Box, Text, Stack, Link, Icon } from '@chakra-ui/react'
import { RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'

type Props = {
  title: string
  children: React.ReactNode
}

export const NavSection = ({ children, title }: Props) => {
  return (
    <Box>
      <Text
        fontWeight="bold"
        color="gray.400"
        fontSize="small"
        textTransform="uppercase"
      >
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
