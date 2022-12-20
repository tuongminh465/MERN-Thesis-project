import React from 'react'
import Chart from '../../components/Chart/Chart'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo'

import './Home.css'

function Main() {
  return (
    <div className="admin-home">
      <FeaturedInfo />
      <Chart />
    </div>
  )
}

export default Main