import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoinNameFilter } from '../../../components/coin-name-filter/CoinNameFilter'

test('it displays helper text', () => {
  render(<CoinNameFilter value="" onChange={(value) => null} />)
  expect(screen.getByText(/filter by name/i)).toBeInTheDocument
})

test('it notifies about changes', () => {
  const mockCallback = jest.fn()
  render(<CoinNameFilter value="" onChange={mockCallback} />)

  userEvent.paste(screen.getByRole('textbox'), 'text')
  expect(mockCallback).toBeCalledWith('text')
})
