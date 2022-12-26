import React from 'react'
import { Link } from 'react-router-dom'

import './TopBar.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Badge } from '@mui/material';

function TopBar() {
  return (
    <div className="topbar">
        <div className="wrapper">
            <div className="left">
                <h1 className='logo'>FSTORE Admin Dashboard</h1>
            </div>
            <div className="right">
                <div className="icon-ctn">
                  <SettingsIcon />
                </div>
                <div className="icon-ctn">
                  <Link style={{ color: 'black' }} to={'/'}>
                    <HomeIcon />
                  </Link>
                </div>
                <div className="icon-ctn">
                  <Badge badgeContent="2"color='primary'>
                    <NotificationsIcon /> 
                  </Badge>
                </div>
                <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default TopBar