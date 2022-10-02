import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import './Navbar.css'
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {

  const cartQuantity = useSelector(state => state.cart.quantity)

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
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>
            <h1 className="logo">FSTORE.</h1>
          </Link>
        </div>
        <div className='right'>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/products'>
            <div className="menu-items">PRODUCTS</div>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/register'>
            <div className="menu-items">REGISTER</div>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/login'>
            <div className="menu-items">LOG IN</div>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/cart'>
            <div className="menu-items">
              <Badge badgeContent={cartQuantity} color='primary'>
                <ShoppingCartIcon />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar