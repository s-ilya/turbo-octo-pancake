import { lazy, useEffect, useState, Suspense } from 'react'
import { getLatestListings } from '../../services/coinmarket'
import Coin from '../../services/coin'
import {
  coinsLimits,
  CoinsLimitSelector,
} from '../coins-limit-selector/CoinsLimitSelector'
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Navigation from '../navigation/Navigation'

const Table = lazy(() => import('../table/Table'))
const Graph = lazy(() => import('../graph/Graph'))

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
    <Router>
      <Navigation />
      <main>
        <Suspense fallback="Loading...">
          <CoinsLimitSelector
            limit={coinsLimit}
            onChange={setLimitAndGetData}
          />
          <Switch>
            <Route exact path="/table">
              <Table coins={coins} />
            </Route>
            <Route exact path="/chart">
              <Graph data={coins} />
            </Route>
            <Route path="/*">
              <Redirect to="/table" />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  )
}

export default App
