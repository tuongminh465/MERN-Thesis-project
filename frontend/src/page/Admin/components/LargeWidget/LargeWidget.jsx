import React, { useEffect, useState } from 'react'
import './LargeWidget.css'
import { userRequest } from '../../../../requestMethods'

function LargeWidget() {
  const [latestOrders, setLatestOrders] = useState([])

  async function getLatestOrders() {
    const res = await userRequest.get(`/orders?amount=4`)

    return res.data.reverse()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLatestOrders()

        setLatestOrders(res)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])

  const Button = ({ type }) => {
    return ( 
      <button className={`${type.toLowerCase()}`}>{type}</button>
    )
  }

  function convertDateTimeToString(mongoDateTime) {
    const dateTime = new Date(mongoDateTime)
    
    const string = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`

    return string
  }

  return (
    <div className="lg-widget">
       <h3 className="title">Latest transactions</h3>
       <table>
        <tr>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {latestOrders.map(order => {
          return (
            <tbody key={order._id}>
              <td className='user'>
                <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
                <span>{order.user.username}</span>
              </td>
              <td className="date">{convertDateTimeToString(order.createdAt)}</td>
              <td className="amount">${order.total.toFixed(2)}</td>
              <td className="status">
                <Button type={order.status}/>
              </td>
            </tbody>
          )
        })}
       </table>
    </div>
  )
}

export default LargeWidget