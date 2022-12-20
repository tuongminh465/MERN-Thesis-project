import React from 'react'

import './Admin.css'
import Topbar from './components/Topbar/TopBar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './page/Home/Home'

function Admin() {
  return (
    <div>
        <Topbar />
        <div className="admin-ctn">
          <Sidebar />
          <div className="others">
            <Home />
          </div>
        </div>
    </div>
  )
}

export default Admin