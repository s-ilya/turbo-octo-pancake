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
import { useSafeSetState as useCallIfMounted } from '../../utils/use-call-if-mounted'

const Table = lazy(() => import('../table/Table'))
const Graph = lazy(() => import('../graph/Graph'))

type LoadStatus = 'pending' | 'ready'

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [displayCoins, setDisplayCoins] = useState<Coin[]>([])
  const [coinsLimit, setCoinsLimit] = useState(coinsLimits[0])
  const [coinNameFilter, setCoinNameFilter] = useState('')
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('pending')
  const callIfMounted = useCallIfMounted()

  const fetchCoins = (limit: number) => {
    callIfMounted(() => setLoadStatus('pending'))

    getLatestListings(limit).then((response) => {
      callIfMounted(() => {
        setCoins(response)
        setLoadStatus('ready')
      })
    })
  }

  const setLimitAndFetchCoins = (limit: number) => {
    callIfMounted(() => setCoinsLimit(limit))
    fetchCoins(limit)
  }

  useEffect(() => fetchCoins(coinsLimit), [])

  const filterCoins = () => {
    const nameRegexp = new RegExp(coinNameFilter, 'i')
    callIfMounted(() => {
      setDisplayCoins(coins.filter((coin) => coin.name.match(nameRegexp)))
    })
  }

  useEffect(filterCoins, [coins])
  useEffect(debounce(filterCoins, 500), [coinNameFilter])

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
                onChange={setLimitAndFetchCoins}
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
