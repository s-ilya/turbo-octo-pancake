import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Coin from '../../services/coin'
import './Graph.css'

function Graph(props: { data: Coin[] }) {
  const { data } = props

  return (
    <ResponsiveContainer
      className="bar-chart-wrapper"
      width="100%"
      height={250}
    >
      <BarChart barGap={2} barSize={800 / data.length} data={data}>
        <XAxis dataKey="name" />
        <YAxis tickCount={7} />
        <Tooltip />
        <CartesianGrid />
        <Bar dataKey={price} fill="#ff7300" radius={[5, 5, 5, 5]} />
        <ReferenceLine type="horizontal" y={0} stroke="#666" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function price(coin: Coin) {
  return coin.quote.USD.price
}

export default Graph
