import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useBreakpointValue } from '@chakra-ui/react'
import { Header } from '.'

jest.mock('@chakra-ui/react', () => {
  const original = jest.requireActual('@chakra-ui/react') // Step 2.
  return {
    ...original,
    useBreakpointValue: jest.fn()
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    const useBreakpointValueMocked = mocked(useBreakpointValue)

    useBreakpointValueMocked.mockReturnValueOnce(true)

    render(<Header />)

    expect(screen.getByText('Hacker News')).toBeInTheDocument()
  })

  it('renders button to open sidebar correctly when is mobile screen ', () => {
    const useBreakpointValueMocked = mocked(useBreakpointValue)

    useBreakpointValueMocked.mockReturnValueOnce(false)

    render(<Header />)

    expect(screen.getByText('Hacker News')).toBeInTheDocument()
  })
})
