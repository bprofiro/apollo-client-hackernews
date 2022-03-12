import { LazyQueryHookOptions, useLazyQuery } from '@apollo/client';
import { FEED_SEARCH_QUERY } from '../../../graphql/queries/search';

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

export const useSearchLinks = (queryOptions?: LazyQueryHookOptions) => {
  return useLazyQuery<FeedLinks>(FEED_SEARCH_QUERY, queryOptions);
}