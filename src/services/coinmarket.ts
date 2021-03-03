import Coin from "./coin";

const getLatestListings = (): Promise<Coin[]> => {
  return fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then(({ data }) => data as Object[])
    .then((dataArray) => dataArray.map(coinFromJson));
};

const coinFromJson = (json: any): Coin => {
  const {
    id,
    name,
    cmc_rank,
    quote: {
      USD: { price, volume_24h, percent_change_24h, market_cap },
    },
  } = json;

  return {
    id,
    name,
    cmc_rank,
    quote: {
      USD: {
        price,
        volume_24h,
        percent_change_24h,
        market_cap,
      },
    },
  };
};

export { getLatestListings };
