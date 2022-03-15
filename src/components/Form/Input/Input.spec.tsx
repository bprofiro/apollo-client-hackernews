import { render, screen } from '@testing-library/react'
import { FieldError } from 'react-hook-form'
import { Input } from '.'

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input name="test" placeholder="Test" />)

    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('renders label correctly when it exists', () => {
    render(<Input name="test" placeholder="Test" label="Test label" />)

    expect(screen.getByLabelText('Test label')).toBeInTheDocument()
  })

  it('renders error message', () => {
    const errorMocked: FieldError = {
      message: 'This input is required',
      type: 'required'
    }
    render(
      <Input
        name="test"
        placeholder="Test"
        label="Test label"
        error={errorMocked}
      />
    )

    expect(screen.getByText('This input is required')).toBeInTheDocument()
  })
})
