import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import ForumIcon from '@mui/icons-material/Forum';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReportIcon from '@mui/icons-material/Report';

function Sidebar() {

  const location = useLocation();
  const active = location.pathname.split('/')[2];
  
  return (
    <div className="sidebar">
        <div className="wrapper">
            <div className="menu">
                <h3 className="title">
                    Dashboard
                </h3>
                <ul>
                    <Link 
                        style={{textDecoration: 'none', color: 'black'}} 
                        to={`/admin`}
                    >
                        <li className={!active ? 'active' : ''}>
                        
                            <LineStyleIcon className='icon'/>
                            Home
                        </li>
                    </Link>
                    <li>
                        <TimelineIcon className='icon'/>
                        Analytics
                    </li>
                    <li>
                        <AttachMoneyIcon className='icon'/>
                        Sales
                    </li>
                </ul>
            </div>
            <div className="menu">
                <h3 className="title">
                    Quick menu
                </h3>
                <ul>
                    <Link 
                        style={{textDecoration: 'none', color: 'black'}} 
                        to={`/admin/users`}
                    >
                        <li className={active === 'users' ? 'active' : ''}>
                            <PersonIcon className='icon'/>
                            Users   
                        </li>
                    </Link>
                    <Link 
                        style={{textDecoration: 'none', color: 'black'}} 
                        to={`/admin/products`}
                    >
                        <li className={active === 'products' ? 'active' : ''}>
                            <StoreMallDirectoryIcon className='icon'/>
                            Products
                        </li>
                    </Link>
                    <li>
                        <ReceiptIcon className='icon'/>
                        Transaction
                    </li>
                    <li>
                        <BarChartIcon className='icon'/>
                        Report
                    </li>
                </ul>
            </div>
            <div className="menu">
                <h3 className="title">
                    Notifications
                </h3>
                <ul>
                    <li>
                        <EmailIcon className='icon'/>
                        Mail
                    </li>
                    <li>
                        <ForumIcon className='icon'/>
                        Feedback
                    </li>
                    <li>
                        <ChatBubbleIcon className='icon'/>
                        Messages
                    </li>
                </ul>
            </div>
            <div className="menu">
                <h3 className="title">
                    Staff
                </h3>
                <ul>
                    <li>
                        <ManageAccountsIcon className='icon'/>
                        Manage
                    </li>
                    <li>
                        <TimelineIcon className='icon'/>
                        Analytics
                    </li>
                    <li>
                        <ReportIcon className='icon'/>
                        Reports
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar