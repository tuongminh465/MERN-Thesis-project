import React from 'react'

import './FeaturedInfo.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function FeaturedInfo() {
  return (
    <div className="featured">
        <div className="item">
            <span className='title'>Revenue</span>
            <div className="revenue-ctn">
                <span className="money">
                    $69
                </span>
                <span className="rate">
                    + $69 <ArrowUpwardIcon className='icon'/>
                </span>
            </div>
            <span className="subtitle">Compared to last month</span>
        </div>
        <div className="item">
            <span className='title'>Sales</span>
            <div className="revenue-ctn">
                <span className="money">
                    $420
                </span>
                <span className="rate">
                    + $420 <ArrowUpwardIcon className='icon'/>
                </span>
            </div>
            <span className="subtitle">Compared to last month</span>
        </div>
        <div className="item">
            <span className='title'>Cost</span>
            <div className="revenue-ctn">
                <span className="money">
                    $42069
                </span>
                <span className="rate">
                    - $69 <ArrowDownwardIcon className='icon negative'/>
                </span>
            </div>
            <span className="subtitle">Compared to last month</span>
        </div>
    </div>
  )
}

export default FeaturedInfo