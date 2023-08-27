import React from 'react'
import { Link } from 'react-router-dom'

function ProductDisplay({filteredProducts}) {
  
  return (
    <div className="products-list">
        {
            filteredProducts.map(product => (
                <Link style={{textDecoration: 'none'}} to={`/product/${product._id}`}>
                    <div className="product-ctn" key={product._id}>
                        <img src={product.img} alt="" />
                        <div className="info-ctn">
                            <h4 className='product-name'>{product.name}</h4>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </div>
                </Link>
            ))
        }           
    </div>
  )
}

export default ProductDisplay