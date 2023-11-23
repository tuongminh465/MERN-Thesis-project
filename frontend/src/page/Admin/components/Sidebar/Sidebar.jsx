import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ReceiptIcon from '@mui/icons-material/Receipt';

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
                    <Link 
                        style={{textDecoration: 'none', color: 'black'}} 
                        to={`/admin/orders`}
                    >
                        <li className={active === 'orders' ? 'active' : ''}>
                            <ReceiptIcon className='icon'/>
                            Orders
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar