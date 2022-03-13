import { Box, Stack, Text } from '@chakra-ui/react'
import { LINKS_PER_PAGE } from '../../common/constants/pages'
import { generatePagesArray } from '../../utils/generatePagesArray'
import { Item } from './Item'

type Props = {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

const a = [
  {
    page: 1,
    items: '1-5'
  },
  {
    page: 2,
    items: '6-10'
  },
  {
    page: 3,
    items: '11-15'
  }
]

export const Pagination = ({
  totalCountOfRegisters,
  onPageChange,
  currentPage = 1,
  registersPerPage = 5
}: Props) => {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const toItensNumber =
    LINKS_PER_PAGE * currentPage > totalCountOfRegisters
      ? totalCountOfRegisters
      : LINKS_PER_PAGE * currentPage

  const fromItensNumber = toItensNumber - 4

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{fromItensNumber}</strong> - <strong>{toItensNumber}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <Item number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text width="8" color="gray.300" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <Item key={page} number={page} onPageChange={onPageChange} />
          ))}

        <Item isCurrent number={currentPage} onPageChange={onPageChange} />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <Item key={page} number={page} onPageChange={onPageChange} />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text width="8" color="gray.300" textAlign="center">
                ...
              </Text>
            )}
            <Item number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
