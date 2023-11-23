import React, { useState, useEffect } from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';


import './Order.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from 'antd';

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function Order() {

  const userState = useSelector(state => state.user.currentUser)

  const navigate = useNavigate();

  const [orders, setOrders] = useState([])
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  async function getOrders(query) {
    const res = await userRequest.get(`/orders/find/${userState._id}?${query}`)

    console.log(res.data)

    setOrders(res.data)
  }

  useEffect(() => {
    getOrders("")
  }, [])

  function queryBuilder() {
    let query = ""

    if (status) {
        query += `status=${status}&`
    }

    if (startDate && endDate) {
        query += `startDate=${startDate}&endDate=${endDate}&`
    }

    if (sort) {
        const sortBy = sort.split('-')[0]
        const sortOrder = sort.split("-")[1]

        query += `sortBy=${sortBy}&sortOrder=${sortOrder}&`
    }

    if (search) {
        query += `search=${search}&`
    }

    console.log(query)
    
    return query
  }

  useEffect(() => {
    const query = queryBuilder()

    getOrders(query)
  }, [status, startDate, endDate, sort, search])

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
                  <h2 style={{ marginBottom: 15 }}>Search order</h2>
                  <div className="field">
                    <label>Search by Created Date</label>
                      <RangePicker
                        style={{height: 40, borderColor: 'black'}}
                        onChange={newValue => {
                          setStartDate(dayjs(newValue[0]).format(dateFormat))
                          setEndDate(dayjs(newValue[1]).format(dateFormat))
                        }}
                      />
                  </div>
                  <div className="field">
                    <label>Search by product name</label>
                    <input type='text' onChange={(e) => setSearch(e.target.value)}/>
                  </div>
                  <div className="field">
                    <label>Search by status</label>
                    <select name="none" id="" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">None</option>
                    <option value="pending">Pending</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  </div>
                </div>
                <div className="sort-ctn">
                  <h2 style={{ marginBottom: 15 }}>Sort order</h2>
                  <select name="none" id="" onChange={(e) => setSort(e.target.value)}>
                    <option value="">None</option>
                    <option value="createdAt-asc">Created Date (asc)</option>
                    <option value="createdAt-desc">Created Date (desc)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="order-list">
              {
                orders.map((order, index) => (
                  <div className="order-item" key={order._id}>
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