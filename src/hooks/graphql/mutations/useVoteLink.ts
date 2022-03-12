import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const useVoteLink = (mutationOptions: MutationHookOptions) => {
  return useMutation(VOTE_MUTATION, mutationOptions)
}