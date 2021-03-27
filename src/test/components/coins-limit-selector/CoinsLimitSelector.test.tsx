import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoinsLimitSelector } from '../../../components/coins-limit-selector/CoinsLimitSelector'

test('it displays helper text', () => {
  render(<CoinsLimitSelector limit={10} onChange={(value) => null} />)
  expect(screen.getByText(/limit number of results/i)).toBeInTheDocument
})

test('it displays selected value', () => {
  render(<CoinsLimitSelector limit={10} onChange={(value) => null} />)
  expect(screen.getByRole(/button/)).toHaveTextContent('10')
})

test('it has available options', () => {
  render(<CoinsLimitSelector limit={10} onChange={(value) => null} />)

  userEvent.click(screen.getByRole('button'))
  const options = screen.queryAllByRole('option')

  expect(options.length).toBe(3)
  expect(options[0]).toHaveTextContent('2')
  expect(options[1]).toHaveTextContent('10')
  expect(options[2]).toHaveTextContent('50')
})

test('it changes selected option', () => {
  const mockCallback = jest.fn()
  render(<CoinsLimitSelector limit={10} onChange={mockCallback} />)

  userEvent.click(screen.getByRole('button'))
  userEvent.click(screen.queryAllByRole('option')[0])

  expect(mockCallback).toBeCalledWith(2)
})

export {}
