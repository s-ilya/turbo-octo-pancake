import Coin from '../../services/coin'
import './Table.css'
import { useState } from 'react'
import {
  Button,
  Table as MaterialUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import './Table.css'

function Table(prop: { coins: Coin[] }) {
  const { coins } = prop
  const [isRankOrderAsc, switchIsRankOrderAsc] = useState(true)

  return (
    <MaterialUITable>
      <TableHead>
        <TableRow>
          <TableCell>Name 📚</TableCell>
          <TableCell>
            <Button className="table-header-button" onClick={() => switchIsRankOrderAsc(!isRankOrderAsc)}>
              {`Rank ${isRankOrderAsc ? '👆' : '👇'}`}
            </Button>
          </TableCell>
          <TableCell>Price, $ 💸</TableCell>
          <TableCell>Volume, $ 📣</TableCell>
          <TableCell>Change, % 👛</TableCell>
          <TableCell>Market Cap, $ 💰</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {coins.sort(isRankOrderAsc ? sortAsc : sortDesc).map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.name}</TableCell>
            <TableCell data-testid="table-cell-cmc-rank">{coin.cmc_rank}</TableCell>
            <TableCell>{coin.quote.USD.price}</TableCell>
            <TableCell>{coin.quote.USD.volume_24h}</TableCell>
            <TableCell>
              {(coin.quote.USD.percent_change_24h * 100).toPrecision(4)}
            </TableCell>
            <TableCell>{coin.quote.USD.market_cap}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MaterialUITable>
  )
}

const sortAsc: (a: Coin, b: Coin) => number = (a, b) => a.cmc_rank - b.cmc_rank
const sortDesc: (a: Coin, b: Coin) => number = (a, b) => b.cmc_rank - a.cmc_rank

export default Table
