import React from 'react'

import './FeaturedInfo.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function FeaturedInfo({ incomeData }) {

    const thisMonthSales = incomeData.length ? incomeData[incomeData.length - 1].sales : 0
    const lastMonthDiffInSales = incomeData.length ? incomeData[incomeData.length - 1].sales - incomeData[incomeData.length - 2].sales : 0
    
    return (
        <div className="featured">
            <div className="item">
                <span className='title'>Revenue</span>
                <div className="revenue-ctn">
                    <span className="money">
                        ${thisMonthSales - 420}
                    </span>
                    {
                        lastMonthDiffInSales > 0 ? 
                        <span className="rate">
                            + ${lastMonthDiffInSales - 420 + 69} <ArrowUpwardIcon className='icon' />
                        </span> :
                        <span className="rate">
                            - ${lastMonthDiffInSales - 420 + 69 * -1} <ArrowDownwardIcon className='icon negative' />
                        </span>
                    }
                </div>
                <span className="subtitle">Compared to last month</span>
            </div>
            <div className="item">
                <span className='title'>Sales</span>
                <div className="revenue-ctn">
                    <span className="money">
                        ${thisMonthSales}
                    </span>
                    {
                            lastMonthDiffInSales > 0 ? 
                            <span className="rate">
                                + ${lastMonthDiffInSales} <ArrowUpwardIcon className='icon' />
                            </span> :
                            <span className="rate">
                                - ${lastMonthDiffInSales * -1} <ArrowDownwardIcon className='icon negative' />
                            </span>
                    }   
                </div>
                <span className="subtitle">Compared to last month</span>
            </div>
            <div className="item">
                <span className='title'>Cost</span>
                <div className="revenue-ctn">
                    <span className="money">
                        $420
                    </span>
                    <span className="rate">
                        $69 <ArrowUpwardIcon className='icon negative' />
                    </span>
                </div>
                <span className="subtitle">Compared to last month</span>
            </div>
        </div>
    )
}

export default FeaturedInfo