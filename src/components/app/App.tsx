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
import { Container, Grid, Typography } from '@material-ui/core'

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
      <Typography component="div">
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
              <Switch>
                <Route exact path="/table">
                  <Grid item xs={12}>
                    <Table coins={coins} />
                  </Grid>
                </Route>
                <Route exact path="/chart">
                  <Grid item xs={12}>
                    <Graph data={coins} />
                  </Grid>
                </Route>
                <Route path="/*">
                  <Redirect to="/table" />
                </Route>
              </Switch>
            </Suspense>
          </Grid>
        </Container>
      </Typography>
    </Router>
  )
}

export default App
