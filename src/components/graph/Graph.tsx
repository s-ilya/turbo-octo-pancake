import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'
import Coin from '../../services/coin'

function Graph(props: { data: Coin[] }) {
  const { data } = props

  return (
    <div className="bar-chart-wrapper">
      <BarChart
        width={800}
        height={250}
        barGap={2}
        barSize={800 / data.length}
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Tooltip />
        <CartesianGrid />
        <Bar dataKey={price} fill="#ff7300" radius={[5, 5, 5, 5]} />
        <ReferenceLine type="horizontal" y={0} stroke="#666" />
      </BarChart>
    </div>
  )
}

function price(coin: Coin) {
  return coin.quote.USD.price
}

export default Graph
