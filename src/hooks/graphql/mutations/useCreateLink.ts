import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export const useCreateLink = (mutationOptions?: MutationHookOptions) => {
  return useMutation(CREATE_LINK_MUTATION, mutationOptions)
}