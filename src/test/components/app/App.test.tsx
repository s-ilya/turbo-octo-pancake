import { render, screen, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { buildFakeCoin } from '../../services/build-fake-coin'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

jest.mock('../../../components/graph/Graph', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Graph</div>;
    },
  };
})

import App from '../../../components/app/App'

const server = setupServer(
  rest.get(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [buildFakeCoin()],
          status: {
            timestamp: '2018-06-02T22:51:28.209Z',
            error_code: 0,
            error_message: '',
            elapsed: 10,
            credit_count: 1,
          },
        })
      )
    }
  )
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

test('it shows loading screen when loading coins and when loading graph', async () => {
  render(<App />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()

  await waitForElementToBeRemoved(screen.getByRole('progressbar'))
  expect(screen.getByRole("table")).toBeInTheDocument()

  userEvent.click(screen.getByText(/chart/i))
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
  await waitForElementToBeRemoved(screen.getByRole('progressbar'))
  expect(screen.getByText('Graph')).toBeInTheDocument()
})
