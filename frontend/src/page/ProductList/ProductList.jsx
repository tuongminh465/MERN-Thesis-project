import React, { useState } from 'react'

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';
import { allProducts } from '../../component/data'

import './ProductList.css'


function ProductList() {
  
  const [products, setProducts] = useState(allProducts);

  const handleChangeBrand = event => {
    if (event.target.value !== '') {
        const productsArray = allProducts.filter(product => product.manufacturer === event.target.value);
        setProducts(productsArray);
    }
    else {
        setProducts(allProducts);
    }
  }

  return (
    <div className="pl-ctn">
        <Navbar />
        <Announcement />
        <div className="filter-ctn">
            <div className="filter">
                <span>Filter products:</span>
                <select name="" id="" onChange={handleChangeBrand}>
                    <option selcted disabled value="">By brand</option>
                    <option value="">All</option>
                    <option value="AMD">AMD</option>
                    <option value="ASUS">ASUS</option>
                    <option value="ASROCK">ASROCK</option>
                    <option value="Corsair">Corsair</option>
                    <option value="HyperX">HyperX</option>
                    <option value="GIGABYTE">GIGABYTE</option>
                    <option value="Intel">Intel</option>
                    <option value="MSI">MSI</option>
                </select>
            </div>
            <div className="filter">
                <span>Sort products:</span>
                <select name="" id="">
                    <option value="">Alphabetical</option>
                    <option value="year-asc">Year (asc)</option>
                    <option value="year-desc">Year (desc)</option>
                    <option value="price-asc">Price (asc)</option>
                    <option value="price-desc">Price (desc)</option>
                </select>
            </div>
        </div>
        <hr />
        <div className="products-list">
            
                {
                    products.map(product => (
                        <div className="product-ctn" key={product.id}>
                            <img src={product.img} alt="" />
                            <div className="info-ctn">
                                <h4 className='product-name'>{product.name}</h4>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </div>
                    ))
                }
            
        </div>
        <hr />
        <Footer />
    </div>
  )
}

export default ProductList