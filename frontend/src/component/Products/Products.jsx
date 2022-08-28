import React from 'react'

import SingleProduct from '../SingleProduct/SingleProduct'
import { popularProducts } from '../data'

import './Products.css'

function Products() {
  return (
    <div className="prod-display-ctn">
      <h1>Some popular products you might want to check out...</h1>
      <div className='prod-ctn'>
        {
            popularProducts.map(item => (
                <SingleProduct item={item}/> 
            ))
        }
      </div>
    </div>
  )
}

export default Products