import React from 'react'
import { Link } from "react-router-dom"

import './SingleProduct.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function SingleProduct({item}) {
  return (
    <div className='sp-ctn'>
      <img src={item.img} alt="" />
      <div className="info-ctn">
        <div className="icon-ctn">
          <AddShoppingCartIcon />
        </div>
        <div className="icon-ctn">
          <Link to={`/product/${item._id}`}>
            <SearchIcon />
          </Link>
        </div>
        <div className="icon-ctn">
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  )
}

export default SingleProduct