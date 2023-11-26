import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUsers } from '../../../../redux/apiCalls';

import './UserList.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function UserList() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.adminUsers.users)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      try {
        getUsers(dispatch)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [dispatch])

  async function handleDeleteUser(id, dispatch) {
    if (!window.confirm(`Are you sure you want to delete user ${id}?`)) {
      return
    }

    deleteUsers(id, dispatch)

    window.alert(`User ${id} was deleted successfully`)
  }

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'username', headerName: 'Username', flex: 1, renderCell: (params) => {
      return (
        <div className='user'>
           <img className='pfp-pic' src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt=""/>
           {params.row.username}
        </div>
      )
    }},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'isAdmin', headerName: 'Admin status', flex: 0.25 },
    {
      field: 'action', headerName: 'Actions', flex: 0.5, renderCell: (params) => {
        return (
          <div className='action'>
            <Link to={`/admin/users/${params.row._id}`}>
              <button className='edit'>Edit</button>
            </Link>
            <button onClick={() => handleDeleteUser(params.row._id, dispatch)} className='delete'>Delete</button>
          </div>
        )
      }
    },
  ];

  return (
    <div className="user-list">
      {
        isLoading ? 
        <h1>Fetching data...</h1> :
        <div>
          <div className="title-ctn">
            <h2>Users list</h2>
            <Link style={{textDecoration: 'none'}} to={`/admin/users/newUser`}>
              <button>
                <PersonAddIcon />
                Add new user
              </button>
            </Link>
          </div>
          <div style={{ height: '85vh', width: '100%' }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={10}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
              />
          </div>
        </div>
      }
    </div>
  )
}

export default UserList