import { Button, Flex, Link, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../../../components/Form/Input'
import { useAuth } from '../../../../hooks/useAuth'
import { AuthLayout } from '../../layouts/AuthLayout'
import { signUpFormSchema } from './schemas'

type SignUpFormData = {
  name: string
  email: string
  password: string
}

export const SignUp = () => {
  const { signUp } = useAuth()

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleSignUp: SubmitHandler<SignUpFormData> = data => {
    signUp({ email: data.email, name: data.name, password: data.password })
  }

  return (
    <AuthLayout title="Sign Up">
      <Flex
        as="form"
        w="100%"
        maxWidth={368}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Stack spacing="4">
          <Input
            label="Nome"
            error={formState.errors.name}
            {...register('name')}
          />
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
          Cadastrar
        </Button>

        <Link
          mt="4"
          cursor="pointer"
          color="blue.500"
          fontWeight="bold"
          fontSize="md"
          mx="auto"
          href="/sign-in"
        >
          Fazer login
        </Link>
      </Flex>
    </AuthLayout>
  )
}
