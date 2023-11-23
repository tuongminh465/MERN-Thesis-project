import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import './Chart.css'

function Chart({ title, data, dataKey, grid}) {

  const XLabel = () => {
    return ( 
      <text>Months</text>
    )
  }

  const YLabel = () => {
    return ( 
        <text>Income (USD)</text>
    )
  }

  return (
    <div className="chart">
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 10, left: 100, bottom: 15 }}
          >
            { grid && <CartesianGrid strokeDasharray="3 3" /> }
            <XAxis dataKey="month" label={{ value: 'Months', position: 'bottom', offset: 0 }} />
            <YAxis label={{ value: 'Sales (USD)', angle: 0, position: 'left', offset: 0  }} />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart