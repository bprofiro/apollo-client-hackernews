import { OperationVariables, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { FEED_QUERY } from '../../../graphql/queries/feed';
import { sortTrendingLinks } from '../../../utils/sortRankedLinks';

type Vote = {
  user: {
    id: string
  }
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

type QueryOptions = QueryHookOptions & {
  isRanked?: boolean;
}

export const useFeedLinks = (queryOptions?: QueryOptions): QueryResult<FeedLinks, OperationVariables> => {
  const queryResult = useQuery<FeedLinks>(FEED_QUERY, queryOptions);

  if (queryOptions?.isRanked && queryResult.data) {
    const slicedLinks = queryResult.data.feed.links.slice();
    const rankedLinks = sortTrendingLinks(slicedLinks)

    return {
      ...queryResult,
      data: {
          ...queryResult.data,
          feed: {
          ...queryResult.data.feed,
          links: rankedLinks
        }
      }
    }
  }


  return queryResult
}