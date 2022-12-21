import React from 'react'
import './LargeWidget.css'

function LargeWidget() {

  const Button = ({ type }) => {
    return ( 
        <button className={`${type.toLowerCase()}-btn`}>{type}</button>
    )
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
        <tr>
          <td className='user'>
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
            <span>Melon Eusk</span>
          </td>
          <td className="date">22/6/2022</td>
          <td className="amount">$419.99</td>
          <td className="status">
             <Button type={'Approved'}/>
          </td>
        </tr>
        <tr>
          <td className='user'>
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
            <span>Melon Eusk</span>
          </td>
          <td className="date">22/6/2022</td>
          <td className="amount">$419.99</td>
          <td className="status">
             <Button type={'Declined'}/>
          </td>
        </tr>
        <tr>
          <td className='user'>
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
            <span>Melon Eusk</span>
          </td>
          <td className="date">22/6/2022</td>
          <td className="amount">$419.99</td>
          <td className="status">
             <Button type={'Pending'}/>
          </td>
        </tr>
       </table>
    </div>
  )
}

export default LargeWidget