import { setupWorker, rest } from 'msw'
import { buildFakeCoin } from '../../test/services/build-fake-coin'
import Coin from '../coin'

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
        coins = [...coins, buildFakeCoin()]
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
