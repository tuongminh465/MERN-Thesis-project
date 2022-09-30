import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    useLocation,
    useNavigate
} from 'react-router-dom'

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';
// import { allProducts } from '../../component/data'

import './ProductList.css'


function ProductList() {

  const navigate = useNavigate();

  const location = useLocation();
  const type = location.pathname.split('/')[2];
  
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  //Get products on render
  useEffect(() => {
    const getProducts = async () => {

        try {

            let req = `http://localhost:5000/api/products`
            if ( type === undefined) {
                req = `http://localhost:5000/api/products`
            } else {
                req = `http://localhost:5000/api/products?type=${type}`
            }

            const res = await axios.get(req);
            setProducts(res.data)
            setFilteredProducts(res.data);

        } catch (error) {
            console.log(error);
        }
    }
    getProducts();
    
  }, [type])

  useEffect(() => {
    // type && setFilteredProducts(
    //     products.filter((product) =>)
    // )
    console.log(filter)
    console.log(sort)

    if(filter){
        setFilteredProducts(products.filter(product => product.manufacturer === filter))
    } else {
        setFilteredProducts(products)
    }

    if(sort) {
        switch(sort){
            case 'alpha':
                setFilteredProducts((product) => [...product.sort((a, b) => a.name.localeCompare(b.name))])
                break;
            default:
                setFilteredProducts(products);
        }
    }
  }, [sort, filter, type])

  const handleChangeType = event => {
        navigate(`/products/${event.target.value}`);
  }

  return (
    <div className="pl-ctn">
        <Navbar />
        <Announcement />
        <div className="filter-ctn">
            <div className="filter">
                <span>Filter products by manufacturer:</span>
                <select name="manu" id="" onChange={(e) => setFilter(e.target.value)}>
                    <option value="" selected>All</option>
                    <option value="AMD">AMD</option>
                    <option value="ASUS">ASUS</option>
                    <option value="ASRock">ASRock</option>
                    <option value="Corsair">Corsair</option>
                    <option value="HyperX">HyperX</option>
                    <option value="GIGABYTE">GIGABYTE</option>
                    <option value="Intel">Intel</option>
                    <option value="MSI">MSI</option>                    
                </select>
            </div>
            <div className="filter">
                <span>Filter products by type:</span>
                <select name="" id="" onChange={handleChangeType}>
                    <option value="" selected>All</option>
                    <option value="CPU">CPU</option>
                    <option value="GPU">GPU</option>
                    <option value="RAM">RAM</option>
                    <option value="Mainboard">Mainboard</option>                  
                </select>
            </div>
            <div className="filter">
                <span>Sort products:</span>
                <select name="sort" id="" onChange={(e) => setSort(e.target.value)}>
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
                filteredProducts.map(product => (
                    <div className="product-ctn" key={product.id}>
                        <img src={product.img} alt="" />
                        <div className="info-ctn">
                            <h4 className='product-name'>{product.name}</h4>
                            <p className="product-price">${product.price}</p>
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