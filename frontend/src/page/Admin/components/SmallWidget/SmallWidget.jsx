import React, { useState, useEffect } from 'react'
import { userRequest } from '../../../../requestMethods'

import './SmallWidget.css'
import VisibilityIcon from '@mui/icons-material/Visibility';

function SmallWidget() {
  
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/users/find/?new=true')
        setUsers(res.data)
      } 
      catch (error) {
        console.log(error)
      }
    }

    getUsers();
  }, [])

  return (
    <div className="sm-widget">
        <span className="title">New users</span>
        <ul>
          { users.map(user => {
            return (
              <li key={user._id}>
                <div className="user-ctn">
                  <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
                  <div className="user-info">
                    <span className="name">
                      {user.username}
                    </span>
                    <span className="email">
                      {user.email}
                    </span>
                  </div>
                </div>
                <button className="display-btn">
                  <VisibilityIcon style={{ marginRight: 5, color: "black", fontSize: 16}} />
                  Display
                </button>
              </li>
            )
          })}
          
        </ul>
    </div>
  )
}

export default SmallWidget