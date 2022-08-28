import React from 'react'

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
          <SearchIcon />
        </div>
        <div className="icon-ctn">
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  )
}

export default SingleProduct