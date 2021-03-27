import { useEffect, useState } from 'react'
import Coin from '../../../services/coin'
import { getLatestListings } from '../../../services/coinmarket'
import { useIsMounted } from '../../../utils/use-is-mounted'

type LoadStatus = 'pending' | 'ready'

function useCoinsListing(coinsLimit: number) {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('pending')
  const isMounted = useIsMounted()

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    setLoadStatus('pending')
    getLatestListings(coinsLimit).then((response) => {
      if (!isMounted.current) {
        return
      }

      setCoins(response)
      setLoadStatus('ready')
    })
  }, [coinsLimit, isMounted])

  return { coins, loadStatus }
}

export { useCoinsListing }
