import { Button } from '@chakra-ui/react'

type Props = {
  isCurrent?: boolean
  number: number
  onPageChange: (page: number) => void
}

export const Item = ({ isCurrent = false, number, onPageChange }: Props) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="blue"
        disabled
        _disabled={{
          bg: 'blue.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
