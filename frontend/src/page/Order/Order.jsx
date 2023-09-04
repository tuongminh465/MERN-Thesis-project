import React, { useState, useEffect } from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux'

import './Order.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CancelIcon from '@mui/icons-material/Cancel';

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';

function Order() {

  const userState = useSelector(state => state.user.currentUser)

  const navigate = useNavigate();

  const [orders, setOrders] = useState([])
  const [sort, setSort] = useState("");

  async function getOrders() {
    const res = await userRequest.get(`/orders/find/${userState._id}`)

    setOrders(res.data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  function convertDateTimeToString(mongoDateTime) {
    const dateTime = new Date(mongoDateTime)
    
    const string = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`

    return string
  }

  async function handleCancelOrder(order, index) {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    const updatedOrders = [...orders]
    updatedOrders[index].status = "cancelled"
    
    setOrders(updatedOrders)

    window.alert(`Order ${order._id} cancelled successfully!`)

    await userRequest.put(
      `/orders/${userState._id}/${order._id}`,
      {
        ...order,
        status: "cancelled"
      }
    )
  }

  return (
    <div>
      <Announcement />
      <Navbar />
        {
          orders ?
          <div className="order-ctn">
            <div className="left">
              <div className="filter-ctn">
                <div className="search-ctn">
                  <h2>Search order</h2>
                  <div>
                    <label>Search by created date</label>
                    <input type='date'/>
                  </div>
                  <div>
                    <label>Search by product name</label>
                    <input type='text'/>
                  </div>
                </div>
                <div className="sort-ctn">
                  <h2>Sort order</h2>
                  <select name="none" id="" onChange={(e) => setSort(e.target.value)}>
                    <option value="none">None</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (asc)</option>
                    <option value="price-desc">Price (desc)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="order-list">
              {
                orders.map((order, index) => (
                  <div className="order-item">
                    <div className="header">
                      <div className="header-item">
                        <h2>Order ID</h2>
                        <p>{order._id}</p>
                      </div>
                      <div className="header-item">
                        <h2>Status</h2>
                        <p>{order.status}</p>
                      </div>
                      <div className="header-item">
                        <h2>Created date</h2>
                        <p>{convertDateTimeToString(order.createdAt)}</p>
                      </div>
                      <div className="header-item">
                        <h2>Total</h2>
                        <p>${parseFloat(order.total).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="details">
                      {
                        order.products.map(product => (
                          <div className='product'>
                            <img src={product.img} alt={product.name} />
                            <div>
                              <h3>{product.name}</h3>
                              <p style={{ fontSize: 18 }}>
                                Quantity: {product.quantity}
                              </p>
                              <p style={{ fontSize: 18 }}>
                                Subtotal: ${product.subtotal}
                              </p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="footer">
                      <button 
                        onClick={() => handleCancelOrder(order, index)}
                        disabled={order.status !== "pending"}
                      >
                        <CancelIcon />
                        Cancel order
                      </button>
                    </div>
                </div>
                ))
              }
              </div>
            </div>
          </div>
          : 
          <div className='no-order-ctn'>
            <h1 style={{marginBottom: 50}}>Oops! It seems like you dont have any order yet</h1>
            <button className='products-btn' onClick={() => navigate("/products")}>
              <ShoppingBagIcon style={{marginRight: 10}}/>
              Browse product list
            </button>
          </div>
        }
      <Footer />
    </div>
  )
}

export default Order