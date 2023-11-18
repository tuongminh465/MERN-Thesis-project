import React, { useEffect, useState } from 'react'
import { userRequest } from '../../../../requestMethods';
import { Link } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid';

import './OrderList.css'

function OrderList() {

  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])

  async function getOrders() {
    const res = await userRequest.get(`/orders/`)

    console.log(res.data)

    setOrders(res.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOrders()

        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])

  function convertDateTimeToString(mongoDateTime) {
    const dateTime = new Date(mongoDateTime)
    
    const string = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`

    return string
  }

  async function deleteOrder(id) {
    if (!window.confirm(`Are you sure you want to delete order ${id}?`)) {
      return
    }

    try {
      const res = await userRequest.delete(`/orders/${id}`)

      if (res) {
        window.alert(`Order ${id} was deleted successfully`)

        const newOrders = orders.filter(order => order._id != id)
        
        setOrders(newOrders)
      }
        
    }
    catch (error) {
      console.log(error)
    }
  } 

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'username', headerName: 'Username', flex: 0.3, renderCell: (params) => {
        return (
          <p>{params.row.user.username}</p>
        )
      } 
    },
    { field: 'email', headerName: 'Email', flex: 0.5, renderCell: (params) => {
        return (
          <p>{params.row.user.email}</p>
        )
      } 
    },
    { field: 'total', headerName: 'Total', flex: 0.2, renderCell: (params) => {
        return (
          <p>${parseFloat(params.row.total).toFixed(2)}</p>
        )
      }
    },
    { field: 'createdAt', headerName: 'Created at', flex: 0.2, renderCell: (params) => {
        return (
          <p>{convertDateTimeToString(params.row.createdAt)}</p>
        )
      }
    },
    { field: 'status', headerName: 'Status', flex: 0.2 , renderCell: (params) => {
        return (
          <button className={params.row.status}>
            {params.row.status}
          </button>
        )
      }
    },
    {
      field: 'action', headerName: 'Actions', flex: 0.4, renderCell: (params) => {
        return (
          <div className='action'>
            <Link to={`/admin/orders/${params.row._id}`}>
              <button className='edit'>Detail</button>
            </Link>
            <button 
              className='delete'
              onClick={() => deleteOrder(params.row._id)}
            >
              Delete
            </button>
          </div>
        )
      }
    },
  ];

  return (
    <div className="user-list">
      {
        isLoading ? 
        <h1>Fetching data...</h1> 
        :
        <div>
          <div className="title-ctn">
            <h2>Orders list</h2>
          </div>
          <div 
            className='order-list-table' 
            style={{ height: '85vh', width: '100%' }}
          >
              <DataGrid
                rows={orders}
                columns={columns}
                pageSize={10}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[10]}
                checkboxSelection={false}
              />
          </div>
        </div>
      }
    </div>
  )
}

export default OrderList