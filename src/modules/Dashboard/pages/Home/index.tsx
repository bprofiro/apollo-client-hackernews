import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { Link } from '../../../../components/Links/LinkComponent'
import { useFeedLinks } from '../../../../hooks/graphql/queries/useFeedLinks'
import { DashboardLayout } from '../../layouts/DashboardLayouts/index'

export const Home = () => {
  const {
    data,
    loading: isLoadingLinks,
    error,
    subscribeToMore
  } = useFeedLinks({
    variables: { take: 100, skip: 0, orderBy: { createdAt: 'desc' } }
  })

  return (
    <DashboardLayout title="All links">
      <Heading size="lg" fontWeight="normal" marginBottom="5">
        All links
      </Heading>

      <VStack flex="1" gap="2">
        {isLoadingLinks ? (
          <Spinner size="sm" color="gray.500" ml="4" />
        ) : data ? (
          data.feed.links.map((link, index) => (
            <Link
              id={link.id}
              key={link.id}
              index={index + 1}
              description={link.description}
              url={link.url}
              votes={link.votes}
            />
          ))
        ) : (
          <Text>There is no links here :(</Text>
        )}
      </VStack>
    </DashboardLayout>
  )
}
