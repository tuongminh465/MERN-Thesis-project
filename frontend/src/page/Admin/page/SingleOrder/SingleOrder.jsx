import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './SingleOrder.css'

import { userRequest } from '../../../../requestMethods';

const status = [
  {
    key: 0,
    value: "cancelled"
  },
  {
    key: 1,
    value: "pending"
  },
  {
    key: 2,
    value: "shipping"
  },
  {
    key: 3,
    value: "delivered"
  }
]

function SingleOrder() {
  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/orders/${id}`)

        console.log(res.data)
        setOrder(res.data)

        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    
    getProduct();
  }, [id])

  async function handleUpdateOrderStatus(newStatus) {
    await userRequest.put(
      `/orders/${order._id}`, 
      {
        ...order,
        status: newStatus
      }
    )
  }

  function convertDateTimeToString(mongoDateTime) {
    const dateTime = new Date(mongoDateTime)
    
    const string = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`

    return string
  }


  return (
    <div className="single-order">
        { isLoading ? 
          <h1>Fetching data...</h1> 
          :
          <div>
            <h1 style={{marginBottom: 20}}>Order details</h1>
            <div className="details-ctn">
              <div className="left">
                <h2>Products</h2>
                <div className="products-ctn">
                    {
                      order.products.map(product => (
                        <div className="product">
                          <img src={product.img} alt={product.name}/>
                          <div className="product-details">
                            <p><b>Name</b>: {product.name}</p>
                            <p><b>Quantity</b>: {product.quantity}</p>
                            <p><b>Subtotal</b>: ${product.subtotal}</p>
                          </div>
                        </div>
                      ))
                    }
                </div>
              </div>
              <div className="right">
                <h2>Details</h2>
                <div className="info-ctn">
                  <p><b>Order Id</b>: {order._id}</p>
                  <p><b>User Id</b>: {order.userId}</p>
                  <p><b>Created date</b>: {convertDateTimeToString(order.createdAt)}</p>
                  <div className='status-select-ctn'>
                    <span style={{fontWeight: 600}}>Order status</span>: 
                    <select 
                      defaultValue={order.status}
                      onClick={e => handleUpdateOrderStatus(e.target.value)}
                    >
                      {
                        status.map(s => (
                          <option value={s.value} 
                            key={s.key}
                          >
                            {s.value}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <p><b>Total</b>: ${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default SingleOrder