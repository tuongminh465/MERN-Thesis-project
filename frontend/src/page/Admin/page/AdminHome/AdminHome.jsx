import React, { useEffect, useState } from 'react'
import Chart from '../../components/Chart/Chart'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo'
import LargeWidget from '../../components/LargeWidget/LargeWidget'
import SmallWidget from '../../components/SmallWidget/SmallWidget'
import { data } from '../../mockData'

import './AdminHome.css'
import { userRequest } from '../../../../requestMethods'

function AdminHome() {
  const [isLoading, setIsLoading] = useState(true)
  const [incomeData, setIncomeData] = useState([])

  async function getIncome() {
    const res = await userRequest.get(`/orders/income`)

    return res.data
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getIncome()

        processIncomeData(res, 12)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])

  function getPreviousMonths(numberOfMonths) {
    const months = [];
    let currentDate = new Date();
  
    for (let i = 0; i < numberOfMonths; i++) {
      const month = (currentDate.getMonth() + 1).toString();
      const year = currentDate.getFullYear().toString();
  
      months.push(`${month}/${year}`);
  
      // Move to the previous month
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    return months.reverse();
  };

  function processIncomeData(income, numberOfMonths) {
    const previousMonths = getPreviousMonths(numberOfMonths)

    const incomeData = previousMonths.map((month) => {
      const existingData = income.find((item) => {
        const { month: existingMonth, year: existingYear } = item._id;
        return month === `${existingMonth}/${existingYear}`;
      });
    
      if (existingData) {
        return {
          month: `${existingData._id.month}/${existingData._id.year}`,
          sales: existingData.sumTotal
        };
      } 
      else {
        return {
          month,
          sales: 0
        };
      }
    });

    setIncomeData(incomeData)
  } 
  

  return (
    <div className="admin-home">
      <FeaturedInfo />
      <Chart data={incomeData} title="Sales Analytics" dataKey={"sales"} grid/>
      <div className="widgets">
        <SmallWidget />
        <LargeWidget />
      </div>
    </div>
  )
}

export default AdminHome