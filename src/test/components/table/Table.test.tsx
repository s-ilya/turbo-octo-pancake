import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table from '../../../components/table/Table'
import { buildFakeCoin } from '../../services/build-fake-coin'

afterEach(() => cleanup())

test('it shows header', () => {
  render(<Table coins={[]} />)

  expect(screen.queryByText(/name/i)).toBeInTheDocument()
  expect(screen.queryByText(/rank/i)).toBeInTheDocument()
  expect(screen.queryByText(/price/i)).toBeInTheDocument()
  expect(screen.queryByText(/volume/i)).toBeInTheDocument()
  expect(screen.queryByText(/change/i)).toBeInTheDocument()
  expect(screen.queryByText(/market cap/i)).toBeInTheDocument()
})

test('it shows coin data', () => {
  const coin = buildFakeCoin()
  render(<Table coins={[coin]} />)

  expect(screen.queryByText(coin.name)).toBeInTheDocument()
  expect(screen.queryByText(coin.cmc_rank)).toBeInTheDocument()
  expect(screen.queryByText(coin.quote.USD.market_cap)).toBeInTheDocument()
  expect(
    screen.queryByText((coin.quote.USD.percent_change_24h * 100).toPrecision(4))
  ).toBeInTheDocument()
  expect(screen.queryByText(coin.quote.USD.price)).toBeInTheDocument()
  expect(screen.queryByText(coin.quote.USD.volume_24h)).toBeInTheDocument()
})

test('it shows multiple coin rows', () => {
  const coins = [buildFakeCoin(), buildFakeCoin()]
  render(<Table coins={coins} />)

  expect(screen.queryByText(coins[0].name)).toBeInTheDocument()
  expect(screen.queryByText(coins[1].name)).toBeInTheDocument()
})

test('it sorts coins', () => {
  const coinOne = buildFakeCoin()
  const coinTwo = buildFakeCoin()
  const coins = [coinOne, coinTwo]

  coinOne.cmc_rank = 1
  coinTwo.cmc_rank = 2

  render(<Table coins={coins} />)

  let rankCells = screen.queryAllByTestId("table-cell-cmc-rank")
  expect(screen.getByRole("button")).toHaveTextContent("Rank 👆")
  expect(rankCells[0]).toHaveTextContent("1")
  expect(rankCells[1]).toHaveTextContent("2")

  userEvent.click(screen.getByRole("button"))
  rankCells = screen.queryAllByTestId("table-cell-cmc-rank")
  expect(screen.getByRole("button")).toHaveTextContent("Rank 👇")
  expect(rankCells[0]).toHaveTextContent("2")
  expect(rankCells[1]).toHaveTextContent("1")
})
