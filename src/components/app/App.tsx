import { lazy, Suspense } from 'react'
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
import { useCoinsState } from './hooks/use-coins-state'

const Table = lazy(() => import('../table/Table'))
const Graph = lazy(() => import('../graph/Graph'))

type LoadStatus = 'pending' | 'ready'

function App() {
  const {
    coins,
    coinsLimit,
    coinNameFilter,
    loadStatus,
    setCoinsLimit,
    setCoinNameFilter,
  } = useCoinsState(coinsLimits)

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
              <CoinsLimitSelector limit={coinsLimit} onChange={setCoinsLimit} />
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
                  {ifDataReady(loadStatus, <Table coins={[...coins]} />)}
                </Grid>
              </Route>
              <Route exact path="/chart">
                <Grid item xs={12}>
                  {ifDataReady(loadStatus, <Graph data={coins} />)}
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
