import { Stack } from '@chakra-ui/react'
import { RiGitMergeLine, RiGithubLine, RiSearchLine } from 'react-icons/ri'
import { BiTrendingUp } from 'react-icons/bi'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export const SideBarNav = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink
          href="/dashboard/"
          shouldMatchExactHref={false}
          icon={RiGithubLine}
        >
          Dashboard
        </NavLink>

        <NavLink href="/top" icon={BiTrendingUp}>
          Trending links
        </NavLink>

        <NavLink href="/create" icon={RiGitMergeLine}>
          Create link
        </NavLink>

        <NavLink href="/search" icon={RiSearchLine}>
          Search link
        </NavLink>
      </NavSection>
    </Stack>
  )
}
