import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../../components/Form/Input'
import { FEED_QUERY } from '../../../../graphql/queries/feed'
import { useCreateLink } from '../../../../hooks/graphql/mutations/useCreateLink'
import { DashboardLayout } from '../../layouts/DashboardLayouts'
import { createLinkFormSchema } from './schemas'

type CreateLinkFormData = {
  url: string
  description: string
}

type Link = {
  id: string
}

type FeedLinks = {
  feed: {
    links: Link[]
  }
}

export const CreateLink = () => {
  const { register, handleSubmit, formState } = useForm<CreateLinkFormData>({
    resolver: yupResolver(createLinkFormSchema)
  })

  const [createLink, { loading: isCreatingLink }] = useCreateLink()

  const navigate = useNavigate()

  const handleCreateLink: SubmitHandler<CreateLinkFormData> = async data => {
    await createLink({
      variables: { url: data.url, description: data.description },

      update: (cache, { data: { post } }) => {
        const take = 100
        const skip = 0
        const orderBy = { createdAt: 'desc' }

        const data = cache.readQuery<FeedLinks>({
          query: FEED_QUERY,
          variables: {
            take,
            skip,
            orderBy
          }
        })

        if (data) {
          cache.writeQuery({
            query: FEED_QUERY,
            data: {
              feed: {
                links: [post, ...data.feed.links]
              }
            },

            variables: {
              take,
              skip,
              orderBy
            }
          })
        }
      },
      onCompleted: () => {
        navigate('/')
      }
    })
  }

  return (
    <DashboardLayout title="Create link">
      <Box as="form" onSubmit={handleSubmit(handleCreateLink)}>
        <Heading size="lg" fontWeight="normal" marginBottom="5">
          Create link
        </Heading>

        <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
          <Input label="Link URL" {...register('url')} />
          <Input label="Link description" {...register('description')} />
        </SimpleGrid>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button href="/dashboard" as="a" colorScheme="whiteAlpha">
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isCreatingLink}>
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </DashboardLayout>
  )
}
