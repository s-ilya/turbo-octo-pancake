import { useEffect, useState } from 'react'
import { getLatestListings } from '../../services/coinmarket'
import Coin from '../../services/coin'
import Table from '../table/Table'
import {
  coinsLimits,
  CoinsLimitSelector,
} from '../coins-limit-selector/CoinsLimitSelector'

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [coinsLimit, setCoinsLimit] = useState(coinsLimits[0])

  const getData = (limit: number) => {
    getLatestListings(limit).then(setCoins)
  }

  const setLimitAndGetData = (limit: number) => {
    setCoinsLimit(limit)
    getData(limit)
  }

  useEffect(() => getData(coinsLimit), [])

  return (
    <div className="App">
      <CoinsLimitSelector limit={coinsLimit} onChange={setLimitAndGetData} />
      <Table coins={coins} />
    </div>
  )
}

export default App
