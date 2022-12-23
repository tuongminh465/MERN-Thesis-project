import React from 'react'
import Chart from '../../components/Chart/Chart'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo'
import LargeWidget from '../../components/LargeWidget/LargeWidget'
import SmallWidget from '../../components/SmallWidget/SmallWidget'
import { data } from '../../mockData'

import './AdminHome.css'

function AdminHome() {
  return (
    <div className="admin-home">
      <FeaturedInfo />
      <Chart data = {data} title="Sales Analytics" dataKey={"amt"} grid/>
      <div className="widgets">
        <SmallWidget />
        <LargeWidget />
      </div>
    </div>
  )
}

export default AdminHome