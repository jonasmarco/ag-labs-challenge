import { render, screen } from '@testing-library/react'
import Error from '.'

describe('Error component tests', () => {
  it('should render correctly', () => {
    render(<Error />)

    expect(
      screen.getByText(
        /tivemos um problema\. por favor tente novamente mais tarde!/i
      )
    ).toBeInTheDocument()
  })
})
