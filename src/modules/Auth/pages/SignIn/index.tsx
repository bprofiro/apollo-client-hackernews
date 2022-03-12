import { gql } from '@apollo/client'
import { Button, Flex, Link, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../../../components/Form/Input'
import { useAuth } from '../../../../hooks/useAuth'
import { AuthLayout } from '../../layouts/AuthLayout'
import { signInFormSchema } from './schemas'

type SignInFormData = {
  email: string
  password: string
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SignIn = () => {
  const { signIn } = useAuth()
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = data => {
    signIn({ email: data.email, password: data.password })
  }

  return (
    <AuthLayout title="Sign In">
      <Flex
        as="form"
        w="100%"
        maxWidth={368}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            error={formState.errors.email}
            type="email"
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <Link
          href="/sign-up"
          mt="4"
          cursor="pointer"
          color="blue.500"
          fontWeight="bold"
          fontSize="md"
          mx="auto"
        >
          Criar uma conta
        </Link>
      </Flex>
    </AuthLayout>
  )
}
