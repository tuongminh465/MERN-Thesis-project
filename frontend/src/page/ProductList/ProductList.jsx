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

  const handleChangeSort = event => {
    if (event.target.value === 'alpha') {
        // const productsArray = allProducts.sort((a, b) => a.name.localeCompare(b.name))
        // console.log(products);
        // setProducts(productsArray);
        console.log(products)
        setProducts((products) => [...products.sort((a, b) => a.name.localeCompare(b.name))]);
    }
    else {
        setProducts(allProducts);
    }
    console.log(event.target.value)
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
                <select name="" id="" onChange={handleChangeSort}>
                    <option selcted disabled value="">Sort options</option>
                    <option value="">None</option>
                    <option value="alpha">Alphabetical</option>
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