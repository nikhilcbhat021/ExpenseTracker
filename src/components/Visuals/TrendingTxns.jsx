import {BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const TrendingTxns = ({categoryData}) => {
  return (
    <div>
      <ResponsiveContainer height='100%' width='100%'>
        <BarChart
          layout='vertical'
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis type='number' />
          <YAxis type='number' name='categories' dataKey="Category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Price" fill='rgba(135, 132, 210, 1)' activeBar={<Rectangle fill="gold" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrendingTxns