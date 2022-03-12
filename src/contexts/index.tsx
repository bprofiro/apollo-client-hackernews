import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { client } from '../services/apollo'
import { theme } from '../styles/theme'
import { AuthProvider } from './auth'
import { SideBarDrawerProvider } from './SideBarDrawer'

const providers = [
  { component: ApolloProvider, props: { client } },
  { component: ChakraProvider, props: { theme } },
  { component: BrowserRouter },
  { component: AuthProvider },
  { component: SideBarDrawerProvider }
]

type Provider = {
  component: React.JSXElementConstructor<React.PropsWithChildren<any>>
  props?: any
}

type ComposeProvidersProps = {
  providers: Provider[]
  children: JSX.Element
}

const ComposeProviders = ({
  providers = [],
  children
}: ComposeProvidersProps) => {
  return providers.reduceRight((acc, { component: Provider, props = {} }) => {
    return <Provider {...props}>{acc}</Provider>
  }, children)
}

export const Providers = ({ children }: React.PropsWithChildren<any>) => (
  <ComposeProviders providers={providers}>{children}</ComposeProviders>
)
