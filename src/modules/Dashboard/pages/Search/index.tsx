import { Heading, Spinner, VStack } from '@chakra-ui/react'
import { Link } from '../../../../components/Links/LinkComponent'
import { useSearchLinks } from '../../../../hooks/graphql/queries/useSearchLinks'
import { DashboardLayout } from '../../layouts/DashboardLayouts/index'
import { SearchInput } from './components/SearchInput'

export const Search = () => {
  const [searchLinks, { data, loading: isLoadingSearch }] = useSearchLinks()

  const handleSubmit = async (search: string) => {
    await searchLinks({
      variables: {
        filter: search
      }
    })
  }

  return (
    <DashboardLayout title="Search links">
      <Heading size="lg" fontWeight="normal" marginBottom="5">
        Search links
        {isLoadingSearch && <Spinner size="sm" color="gray.500" ml="4" />}
      </Heading>

      <SearchInput onSearch={handleSubmit} />

      <VStack flex="1" gap="2">
        {data?.feed.links.map((link, index) => (
          <Link
            id={link.id}
            index={index + 1}
            description={link.description}
            url={link.url}
            key={link.id}
            votes={link.votes}
          />
        ))}
      </VStack>
    </DashboardLayout>
  )
}
