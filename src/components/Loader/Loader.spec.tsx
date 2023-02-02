import { render, screen } from '@testing-library/react'
import Loader from '.'

describe('Loader component tests', () => {
  it('should render correctly', () => {
    render(<Loader />)

    expect(screen.getByText(/carregando\.\.\./i)).toBeInTheDocument()
  })
})
