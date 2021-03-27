import faker from 'faker'
import Coin from '../../services/coin'

let sequenced_number = 1
const sequence = () => sequenced_number++

const buildFakeCoin: () => Coin = () => {
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

export { buildFakeCoin }
