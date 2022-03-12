import { MutationHookOptions, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../../graphql/mutations/login';

type SignInReturn = {
  token: string
  user: {
    id: string
    name: string
  }
}


export const useSigInUser = (mutationOptions?: MutationHookOptions) => {
  return useMutation<SignInReturn>(LOGIN_MUTATION, mutationOptions)
}