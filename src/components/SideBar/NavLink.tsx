import {
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
  Flex
} from '@chakra-ui/react'
import { ActiveLink } from '../Links/ActiveLink'

type Props = ChakraLinkProps & {
  icon: React.ElementType
  children: string
  href: string
  shouldMatchExactHref?: boolean
}

export const NavLink = ({
  children,
  icon,
  href,
  shouldMatchExactHref = true
}: Props) => {
  return (
    <ActiveLink to={href} shouldMatchExactHref={shouldMatchExactHref}>
      <Flex display="flex" alignItems="center">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Flex>
    </ActiveLink>
  )
}
