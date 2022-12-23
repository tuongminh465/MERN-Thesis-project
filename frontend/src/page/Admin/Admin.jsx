import React from 'react'

import './Admin.css'
import Topbar from './components/Topbar/TopBar'
import Sidebar from './components/Sidebar/Sidebar'

import { Outlet } from 'react-router-dom'

function Admin() {

  return (
    <div>
        <Topbar />
        <div className="admin-ctn">
          <Sidebar />
          <div className="others">
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Admin