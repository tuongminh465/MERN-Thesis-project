import React from 'react'
import { Link } from "react-router-dom";

import './CategoryItem.css'

function CategoryItem({item}) {
  return (
    <div className="cati-ctn" key={item.id}>
      <Link to={`/products/${item.type}`} >
        <img src={item.img} alt="" />
        <div className="info-ctn">
          <h1 className="title">{item.title}</h1>
          <button>PURCHASE NOW</button>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem