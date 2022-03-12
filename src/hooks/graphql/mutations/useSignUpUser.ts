import { MutationHookOptions, useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../../../graphql/mutations/login';

type SignUpReturn = {
  token: string
  user: {
    id: string
    name: string
  }
}


export const useSigUpUser = (mutationOptions?: MutationHookOptions) => {
  return useMutation<SignUpReturn>(SIGNUP_MUTATION, mutationOptions)
}