import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductDisplay from './ProductDisplay'

function RAMProductList() {
  const [filteredProducts, setFilteredProducts] = useOutletContext()

  return (
    <div>
      <ProductDisplay filteredProducts={filteredProducts}/>
    </div>
  )
}

export default RAMProductList