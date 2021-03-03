import Coin from "../../services/coin";
import "./Table.css";
import { useState } from "react";

function Table(prop: { coins: Coin[] }) {
  const { coins } = prop;
  const [isRankOrderAsc, switchIsRankOrderAsc] = useState(true);

  return (
    <table className="coins-table">
      <thead>
        <tr className="coins-table__row coins-table__header">
          <HeaderCell>Name 📚</HeaderCell>
          <HeaderCell
            className="coins-table__cell--clickable"
            onClick={() => switchIsRankOrderAsc(!isRankOrderAsc)}
          >{`Rank ${isRankOrderAsc ? "👆" : "👇"}`}</HeaderCell>
          <HeaderCell>Price 💸</HeaderCell>
          <HeaderCell>Volume 📣</HeaderCell>
          <HeaderCell>Change 👛</HeaderCell>
          <HeaderCell>Market Cap 💰</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {coins.sort(isRankOrderAsc ? sortAsc : sortDesc).map((coin) => (
          <tr key={coin.id} className="coins-table__row">
            <Cell>{coin.name}</Cell>
            <Cell>{coin.cmc_rank}</Cell>
            <Cell>{coin.quote.USD.price}</Cell>
            <Cell>{coin.quote.USD.volume_24h}</Cell>
            <Cell>
              {(coin.quote.USD.percent_change_24h * 100).toPrecision(4)}
            </Cell>
            <Cell>{coin.quote.USD.market_cap}</Cell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sortAsc: (a: Coin, b: Coin) => number = (a, b) => a.cmc_rank - b.cmc_rank;
const sortDesc: (a: Coin, b: Coin) => number = (a, b) =>
  b.cmc_rank - a.cmc_rank;

function HeaderCell(props: {
  children: string | number;
  onClick?: () => void;
  className?: string;
}) {
  const { children: data, onClick, className = "" } = props;

  return (
    <th
      onClick={() => {
        if (onClick != null) {
          onClick();
        }
      }}
      className={`${className} coins-table__header-cell`.trim()}
    >
      {data}
    </th>
  );
}

function Cell(props: { children: string | number }) {
  const { children: data } = props;

  return <td className="coins-table__cell">{data}</td>;
}

export default Table;
