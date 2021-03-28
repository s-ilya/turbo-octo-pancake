import { useEffect, useState } from 'react'
import Coin from '../../../services/coin'
import { useIsMounted } from '../../../utils/use-is-mounted'
import { useCoinNameFilterDebounced } from './use-coin-name-filter-debounced'
import { useCoinsListing } from './use-coins-listing'

function useCoinsState(coinsLimits: number[]) {
  const [displayCoins, setDisplayCoins] = useState<Coin[]>([])
  const [coinsLimit, setCoinsLimit] = useState(coinsLimits[0])
  const {
    coinNameFilter,
    coinNameFilterDebounced,
    setCoinNameFilter,
  } = useCoinNameFilterDebounced()
  const isMounted = useIsMounted()

  const { coins, loadStatus } = useCoinsListing(coinsLimit)

  const filterCoins = () => {
    if (!isMounted.current) {
      return
    }

    try {
      const nameRegexp = new RegExp(coinNameFilterDebounced, 'i')
      setDisplayCoins(coins.filter((coin) => coin.name.match(nameRegexp)))
    } catch (e) {
      // ignore incorrect regexp
    }
  }

  useEffect(filterCoins, [coins, coinNameFilterDebounced, isMounted])

  return {
    coins: displayCoins,
    coinsLimit,
    coinNameFilter,
    loadStatus,
    setCoinsLimit,
    setCoinNameFilter,
  }
}

export { useCoinsState }
