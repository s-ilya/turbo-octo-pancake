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
import { Navigation } from '../navigation/Navigation'
import { LinearProgress, Container, Grid } from '@material-ui/core'
import { CoinNameFilter } from '../coin-name-filter/CoinNameFilter'
import { debounce } from '../../utils/debounce'
import { useSafeSetState } from '../../utils/use-safe-set-state'

const Table = lazy(() => import('../table/Table'))
const Graph = lazy(() => import('../graph/Graph'))

type LoadStatus = 'pending' | 'ready'

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [displayCoins, setDisplayCoins] = useState<Coin[]>([])
  const [coinsLimit, setCoinsLimit] = useState(coinsLimits[0])
  const [coinNameFilter, setCoinNameFilter] = useState('')
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('pending')
  const safeSetState = useSafeSetState()

  const getData = (limit: number) => {
    safeSetState(() => setLoadStatus('pending'))

    getLatestListings(limit).then((response) => {
      safeSetState(() => {
        setCoins(response)
        setLoadStatus('ready')
      })
    })
  }

  const setLimitAndGetData = (limit: number) => {
    safeSetState(() => setCoinsLimit(limit))
    getData(limit)
  }

  useEffect(() => getData(coinsLimit), [])

  const filterCoins = debounce(() => {
    const nameRegexp = new RegExp(coinNameFilter, 'i')
    safeSetState(() => {
      setDisplayCoins(coins.filter((coin) => coin.name.match(nameRegexp)))
    })
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
                <LinearProgress />
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
                  {ifDataReady(loadStatus, <Table coins={[...displayCoins]} />)}
                </Grid>
              </Route>
              <Route exact path="/chart">
                <Grid item xs={12}>
                  {ifDataReady(loadStatus, <Graph data={displayCoins} />)}
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

function ifDataReady(loadStatus: LoadStatus, element: JSX.Element) {
  return loadStatus === 'pending' ? <LinearProgress /> : element
}

export default App
