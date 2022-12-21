import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/userSlice';
import  { removeAllProduct } from '../../redux/cartSlice'

import './Navbar.css'
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Navbar() {

  const cartQuantity = useSelector(state => state.cart.quantity)

  const userState = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogOut = () => {
    if(window.confirm("Are you sure you want to log out?") === true) {
      dispatch(logout())
      dispatch(removeAllProduct())
      navigate('/login')
    } else {
      console.log(userState)
    }
  }

  return (
    <div className='navbar-ctn'>
      <div className="wrapper">
        <div className='left'>
          <span className='language'>EN</span>
          <div className="search-ctn">
            {
              userState ?
              <h2>Hello there, {userState.username}!</h2> :
              <h2>Hello there!</h2>
            }
          </div>
        </div>
        <div className='center'>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>
            <h1 className="logo">FSTORE.</h1>
          </Link>
        </div>
        <div className='right'>
          {
            userState.isAdmin ?
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/admin'>
              <div className="menu-items" style={{ color: "purple" }}>DASBOARD</div>
            </Link> : ""
          }
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/products'>
            <div className="menu-items">PRODUCTS</div>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/register'>
            <div className="menu-items">REGISTER</div>
          </Link>
          {
            userState ?
            <div className="menu-items" onClick={() => handleLogOut()}>LOG OUT</div> :
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/login'>
              <div className="menu-items">LOG IN</div>
            </Link> 
          }
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