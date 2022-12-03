import React from 'react'

import { categories } from '../data'
import CatgoryItem from '../CategoryItem/CategoryItem'

import './Category.css'

function Category() {
  return (
    <div className="cat-display-ctn">
      <h1>Some product categories for you...</h1>
      <div className='cat-ctn'>
        {
          categories.map(item => 
            <CatgoryItem item={item} key={item.id}/>    
          )
        }
      </div>
    </div>
  )
}

export default Category