import { cloneElement } from 'react'
import { Link, LinkProps, useLocation, useParams } from 'react-router-dom'

type Props = LinkProps & {
  children: React.ReactElement
  shouldMatchExactHref?: boolean
}

export const ActiveLink = ({
  children,
  shouldMatchExactHref = true,
  ...rest
}: Props) => {
  let isActive = false

  const location = useLocation()
  const params = useParams()

  if (shouldMatchExactHref && location.pathname === rest.to) {
    isActive = true
  }

  if (!shouldMatchExactHref && location.pathname.startsWith(String(rest.to))) {
    isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'blue.400' : 'gray.50'
      })}
    </Link>
  )
}
