import Coin from "../../services/coin";
import "./Table.css";

function Table(prop: { coins: Coin[] }) {
  const { coins } = prop;

  return (
    <table className="coins-table">
      <thead>
        <tr className="coins-table__row coins-table__header">
          <HeaderCell>Name 📚</HeaderCell>
          <HeaderCell>Rank 🪜</HeaderCell>
          <HeaderCell>Price 💸</HeaderCell>
          <HeaderCell>Volume 📣</HeaderCell>
          <HeaderCell>Change 👛</HeaderCell>
          <HeaderCell>Market Cap 💰</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
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

function HeaderCell(props: { children: string | number }) {
  const { children: data } = props;

  return <th className="coins-table__header-cell">{data}</th>;
}

function Cell(props: { children: string | number }) {
  const { children: data } = props;

  return <td className="coins-table__cell">{data}</td>;
}

export default Table;
