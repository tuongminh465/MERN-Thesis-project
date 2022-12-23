import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid';
import { userRows } from '../../mockData';

import './UserList.css'

function UserList() {

  const [data, setData] = useState(userRows)

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'user', headerName: 'User', flex: 1, renderCell: (params) => {
      return (
        <div className='user'>
           <img className='pfp-pic' src={params.row.img} alt=""/>
           {params.row.username}
        </div>
      )
    }},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'transaction', headerName: 'Transaction', flex: 1 },
    {
      field: 'action', headerName: 'Actions', flex: 1, renderCell: (params) => {
        return (
          <div className='action'>
            <Link to={`/admin/users/${params.row.id}`}>
              <button className='edit'>Edit</button>
            </Link>
            <button onClick={() => onDelete(params.row.id)} className='delete'>Delete</button>
          </div>
        )
      }},
  ];

  const onDelete = (id) => {
    const newData = data.filter((user) => user.id !== id)
    return setData(newData)
  }

  return (
    <div className="user-list">
        <h2>Users list</h2>
        <div style={{ height: '85vh', width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    </div>
  )
}

export default UserList