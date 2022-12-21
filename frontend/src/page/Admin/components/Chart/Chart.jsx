import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


import './Chart.css'

function Chart({ title, data, dataKey, grid}) {

  return (
    <div className="chart">
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            { grid && <CartesianGrid strokeDasharray="3 3" /> }
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart