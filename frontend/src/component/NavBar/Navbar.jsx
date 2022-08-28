import React from 'react'

import './Navbar.css'

import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  return (
    <div className='navbar-ctn'>
      <div className="wrapper">
        <div className='left'>
          <span className='language'>EN</span>
          <div className="search-ctn">
            <input type="text" />
            <SearchIcon style={{color: 'grey', fontSize: 20}} />
          </div>
        </div>
        <div className='center'>
          <h1 className="logo">FSTORE.</h1>
        </div>
        <div className='right'>
          <div className="menu-items">PRODUCTS</div>
          <div className="menu-items">REGISTER</div>
          <div className="menu-items">LOG IN</div>
          <div className="menu-items">
            <Badge badgeContent={4} color='primary'>
              <ShoppingCartIcon />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar