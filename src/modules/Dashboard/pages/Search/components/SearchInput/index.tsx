import { Flex, Icon, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

type Props = {
  onSearch: (data: string) => Promise<void>
}

export const SearchInput = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      mb="6"
      maxWidth={400}
      align="center"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.900"
      borderRadius="lg"
    >
      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        color="gray.50"
        variant="unstyled"
        placeholder="Search links"
        _placeholder={{ color: 'gray.400' }}
      />

      <IconButton
        aria-label="Search links"
        icon={<Icon as={RiSearchLine} size="20" m={0} />}
        onClick={() => onSearch(searchValue)}
        colorScheme="blue"
      />
    </Flex>
  )
}
