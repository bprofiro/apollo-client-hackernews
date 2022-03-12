import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { createContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type SideBarDrawerContextData = UseDisclosureReturn

type Props = {
  children: React.ReactNode
}

export const SideBarDrawerContext = createContext(
  {} as SideBarDrawerContextData
)

export const SideBarDrawerProvider = ({ children }: Props) => {
  const disclosure = useDisclosure()
  const location = useLocation()

  useEffect(() => {
    disclosure.onClose()
  }, [location.pathname, disclosure])

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      {children}
    </SideBarDrawerContext.Provider>
  )
}
