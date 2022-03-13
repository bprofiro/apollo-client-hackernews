import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { LINKS_PER_PAGE } from '../../../../common/constants/pages'
import { Link } from '../../../../components/Links/LinkComponent'
import { Pagination } from '../../../../components/Pagination'
import { useFeedLinks } from '../../../../hooks/graphql/queries/useFeedLinks'
import { getPaginationVariables } from '../../../../utils/getPaginationVariables'
import { DashboardLayout } from '../../layouts/DashboardLayouts/index'

export const Home = () => {
  const { page } = useParams()
  const navigate = useNavigate()

  const pageAsNumber = Number(page)
  const { orderBy, skip, take } = getPaginationVariables(pageAsNumber)

  const pageIndex = (pageAsNumber - 1) * LINKS_PER_PAGE

  const {
    data,
    loading: isLoadingLinks,
    error,
    subscribeToMore
  } = useFeedLinks({
    variables: { take, skip, orderBy },
    fetchPolicy: 'cache-and-network'
  })

  const handlechangePage = (page: Number) => {
    navigate(`/dashboard/${String(page)}`)
  }

  return (
    <DashboardLayout title="All links">
      <Heading size="lg" fontWeight="normal" marginBottom="5">
        All links
      </Heading>

      <VStack flex="1" gap="2">
        {isLoadingLinks ? (
          <Spinner size="sm" color="gray.500" ml="4" />
        ) : data ? (
          <>
            {data.feed.links.map((link, index) => (
              <Link
                id={link.id}
                key={link.id}
                index={index + pageIndex + 1}
                description={link.description}
                url={link.url}
                votes={link.votes}
              />
            ))}

            <Pagination
              totalCountOfRegisters={data.feed.count}
              currentPage={pageAsNumber}
              onPageChange={handlechangePage}
              registersPerPage={LINKS_PER_PAGE}
            />
          </>
        ) : (
          <Text>There is no links here :(</Text>
        )}
      </VStack>
    </DashboardLayout>
  )
}
