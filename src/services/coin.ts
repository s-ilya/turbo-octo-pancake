type Coin = {
  id: number,
  name: string,
  cmc_rank: number,
  quote: {
    USD: {
      price: number,
      volume_24h: number,
      percent_change_24h: number,
      market_cap: number,
    },
  },
}

export default Coin