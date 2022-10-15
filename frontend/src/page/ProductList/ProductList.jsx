import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
    useLocation,
    useNavigate,
    Link
} from 'react-router-dom'

import { userRequest } from '../../requestMethods'
import { getUserCartStatus } from '../../redux/cartSlice'

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';

import './ProductList.css'


function ProductList() {
  
  const dispatch = useDispatch()

  const userState = useSelector(state => state.user.currentUser)
  
  useEffect(() => {
    const fetchUserCartStatus = async () => {
      const res =  await userRequest.get(`/cart/find/${userState._id}`)
      if (res.data) {
        dispatch(getUserCartStatus(true))
      } else {
        dispatch(getUserCartStatus(false))
      }
    }

    fetchUserCartStatus();
  }, )

  const navigate = useNavigate();

  const location = useLocation();
  const type = location.pathname.split('/')[2];
  
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterHandler = () => {
    if(filter){
        setFilteredProducts(products.filter(product => product.manufacturer === filter))
    } else {
        setFilteredProducts(products)
    }
  }

  const sortHandler = () => {
        switch (sort){
            case 'alpha':
                setFilteredProducts((product) => [...product.sort((a, b) => a.name.localeCompare(b.name))])
                break;
            case "year-asc":
                setFilteredProducts((product) => [...product.sort((a, b) => a.releaseYear - b.releaseYear)])
                break;
            case "year-desc":
                setFilteredProducts((product) => [...product.sort((a, b) => b.releaseYear - a.releaseYear)])
                break;
            case "price-asc":
                setFilteredProducts((product) => [...product.sort((a, b) => a.price - b.price)])
                break;
            case "price-desc":
                setFilteredProducts((product) => [...product.sort((a, b) => b.price - a.price)])
                break;
            case "none":
                setFilteredProducts((product) => [...product.sort((a, b) => a._id.localeCompare(b._id))])
                break;
            default:
                setFilteredProducts((product) => [...product.sort((a, b) => a._id.localeCompare(b._id))])
        }
  }

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
    filterHandler();
    sortHandler();
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
                    <option value="">All</option>
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
                    { type === undefined || type === '' ? <option value="" selected>All</option> : <option value="">All</option> }
                    { type === "CPU" ? <option value="CPU" selected>CPU</option> : <option value="CPU" >CPU</option> }
                    { type === "GPU" ? <option value="GPU" selected>GPU</option> : <option value="GPU">GPU</option> }
                    { type === "RAM" ? <option value="RAM" selected>RAM</option> : <option value="RAM">RAM</option> }
                    { type === "Mainboard" ? <option value="Mainboard" selected>Mainboard</option> : <option value="Mainboard">Mainboard</option> }               
                </select>
            </div>
            <div className="filter">
                <span>Sort products:</span>
                <select name="none" id="" onChange={(e) => setSort(e.target.value)}>
                    <option value="none">None</option>
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
        <hr />
        <Footer />
    </div>
  )
}

export default ProductList