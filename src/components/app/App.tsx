import { lazy, Suspense, useEffect, useState } from 'react'
import { getLatestListings } from '../../services/coinmarket'
import Coin from '../../services/coin'
import {
  coinsLimits,
  CoinsLimitSelector,
} from '../coins-limit-selector/CoinsLimitSelector'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import { Container, Grid } from '@material-ui/core'
import { CoinNameFilter } from '../coin-name-filter/CoinNameFilter'
import { debounce } from '../../utils/debounce'

const Table = lazy(() => import('../table/Table'))
const Graph = lazy(() => import('../graph/Graph'))

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [displayCoins, setDisplayCoins] = useState<Coin[]>([])
  const [coinsLimit, setCoinsLimit] = useState(coinsLimits[0])
  const [coinNameFilter, setCoinNameFilter] = useState('')

  const getData = (limit: number) => {
    getLatestListings(limit).then(setCoins)
  }

  const setLimitAndGetData = (limit: number) => {
    setCoinsLimit(limit)
    getData(limit)
  }

  useEffect(() => getData(coinsLimit), [])

  const filterCoins = debounce(() => {
    const nameRegexp = new RegExp(coinNameFilter, 'i')
    setDisplayCoins(coins.filter((coin) => coin.name.match(nameRegexp)))
  }, 500)

  useEffect(() => {
    filterCoins()
  }, [coins, coinNameFilter])

  return (
    <Router>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Navigation />
          </Grid>
          <Suspense
            fallback={
              <Grid item xs={12}>
                Loading...
              </Grid>
            }
          >
            <Grid item xs={12}>
              <CoinsLimitSelector
                limit={coinsLimit}
                onChange={setLimitAndGetData}
              />
            </Grid>
            <Grid item xs={12}>
              <CoinNameFilter
                value={coinNameFilter}
                onChange={setCoinNameFilter}
              />
            </Grid>
            <Switch>
              <Route exact path="/table">
                <Grid item xs={12}>
                  <Table coins={displayCoins} />
                </Grid>
              </Route>
              <Route exact path="/chart">
                <Grid item xs={12}>
                  <Graph data={displayCoins} />
                </Grid>
              </Route>
              <Route path="/*">
                <Redirect to="/table" />
              </Route>
            </Switch>
          </Suspense>
        </Grid>
      </Container>
    </Router>
  )
}

export default App
