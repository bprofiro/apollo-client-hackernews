type Vote = {
  user: {
    id: string
  }
}

type LinkProps = {
  id: string;
  url: string;
  description: string;
  createdAt: string;
  votes: Vote[];
}

type  FunctionSort = (rankedLinks: LinkProps[]) => LinkProps[]

export const sortTrendingLinks: FunctionSort = (rankedLinks = []) => {
  return rankedLinks.sort(
    (firstLink, secondLink) => secondLink.votes.length - firstLink.votes.length
  )
}