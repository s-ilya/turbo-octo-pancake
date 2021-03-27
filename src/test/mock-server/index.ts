import { setupWorker, rest } from 'msw'
import faker from 'faker'
import Coin from '../../services/coin'

let sequenced_number = 1
const sequence = () => sequenced_number++

const buildCoin: () => Coin = () => {
  return {
    id: sequence(),
    name: faker.random.word(),
    cmc_rank: faker.random.number(100),
    quote: {
      USD: {
        price: faker.random.float({ max: 1e5 }),
        volume_24h: faker.random.number(1e10),
        percent_change_24h: faker.random.float({ max: 1, precision: 0.0001 }),
        market_cap: faker.random.number(1e12),
      },
    },
  }
}

const requireLimit: () => string = () => {
  throw Error('Limit is required')
}

const worker = setupWorker(
  rest.get(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    async (req, res, ctx) => {
      const limit = parseInt(
        req.url.searchParams.get('limit') ?? requireLimit()
      )

      let coins: Coin[] = []
      while (coins.length < limit) {
        coins = [...coins, buildCoin()]
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            res(
              ctx.json({
                data: coins,
                status: {
                  timestamp: '2018-06-02T22:51:28.209Z',
                  error_code: 0,
                  error_message: '',
                  elapsed: 10,
                  credit_count: 1,
                },
              })
            )
          )
        }, Math.random() * 1000)
      })
    }
  )
)

export { worker }
