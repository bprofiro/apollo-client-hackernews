import { Flex, IconButton, Link as ChakraLink, Text } from '@chakra-ui/react'
import { RiHeartLine } from 'react-icons/ri'
import { FEED_QUERY } from '../../graphql/queries/feed'
import { useVoteLink } from '../../hooks/graphql/mutations/useVoteLink'
import { useAuth } from '../../hooks/useAuth'

type Vote = {
  user: {
    id: string
  }
}

type Props = {
  index: number
  url: string
  description: string
  votes: Vote[]
  id: string
}

type Link = {
  id: string
  createdAt: string
  url: string
  description: string
  votes: Vote[]
}

type FeedLinks = {
  feed: {
    id: string
    links: Link[]
    count: number
  }
}

export const Link = ({ description, index, url, votes, id }: Props) => {
  const { user } = useAuth()

  const [vote] = useVoteLink({
    variables: {
      linkId: id
    },
    update: (cache, { data: { vote } }) => {
      const data = cache.readQuery<FeedLinks>({
        query: FEED_QUERY,
        variables: { take: 100, skip: 0, orderBy: { createdAt: 'desc' } }
      })

      if (data) {
        const { feed } = data

        const updatedLinks = feed.links.map(feedLink => {
          if (feedLink.id === id) {
            return {
              ...feedLink,
              votes: [...feedLink.votes, vote]
            }
          }
          return feedLink
        })

        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: updatedLinks
            }
          },
          variables: { take: 100, skip: 0, orderBy: { createdAt: 'desc' } }
        })
      }
    }
  })

  const handleVoteLnk = () => {
    if (vote) {
      vote()
    }
  }

  const hasUserAlreadyVotedIsThisLink = votes.some(
    vote => vote.user.id === user.id
  )

  return (
    <Flex width="100%" align="center" gap="5">
      <Text as="strong">{index}</Text>

      <Flex direction="column" justifyItems="flex-start">
        <ChakraLink
          href={url}
          cursor="pointer"
          color="blue.500"
          isExternal
          fontWeight="bold"
          fontSize="md"
        >
          {url}
        </ChakraLink>
        <Text fontSize="sm">{description}</Text>
      </Flex>

      <Flex align="center" justify="flex-start" marginLeft="auto" gap="3">
        <Text fontSize="sm">{votes.length} likes</Text>
        <IconButton
          aria-label="Like this link"
          icon={<RiHeartLine />}
          colorScheme="blue"
          onClick={handleVoteLnk}
          isDisabled={hasUserAlreadyVotedIsThisLink}
          _disabled={{
            bgColor: 'gray.700',
            cursor: 'pointer',
            pointerEvents: 'none'
          }}
        />
      </Flex>
    </Flex>
  )
}
