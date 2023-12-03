import React from 'react'
import { Link } from 'react-router-dom'

import './TopBar.css'
import HomeIcon from '@mui/icons-material/Home';

function TopBar() {
  return (
    <div className="topbar">
        <div className="wrapper">
            <div className="left">
                <h1 className='logo'>FSTORE Admin Dashboard</h1>
            </div>
            <div className="right">
                <div className="icon-ctn">
                  <Link style={{ color: 'black' }} to={'/'}>
                    <HomeIcon className='icon'/>
                  </Link>
                </div>
                <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default TopBar