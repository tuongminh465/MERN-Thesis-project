import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publicRequest } from '../../requestMethods'
import {
    useLocation,
    useNavigate,
    Outlet
} from 'react-router-dom'

import { userRequest } from '../../requestMethods'
import { getUserCartStatus } from '../../redux/cartSlice'

import Navbar from '../../component/NavBar/Navbar'
import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer';

import './ProductList.css'
import SearchIcon from '@mui/icons-material/Search';


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

    if (userState) {
        fetchUserCartStatus();
    }
  }, )

  const navigate = useNavigate();

  const location = useLocation();
  const productType = location.pathname.split('/')[2];
  
  const [type, setType] = useState("");
  const [manufacturer, setManufacturer] = useState("")
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);

  function queryBuilder() {
    let query = ""

    if (type) {
        query += `type=${type}&`
    }

    if (manufacturer) {
        query += `manufacturer=${manufacturer}&`
    }

    if (sort) {
        const sortBy = sort.split('-')[0]
        const sortOrder = sort.split("-")[1]

        query += `sortBy=${sortBy}&sortOrder=${sortOrder}&`
    }

    if (search) {
        query += `search=${search}&`
    }

    return query
  }

  async function getProductList(query) {
    const res = await publicRequest.get(`/products?${query}`)

    setFilteredProducts(res.data)
  }

  // Get products on render
  useEffect(() => {
    setType(productType);

    const query = queryBuilder()

    getProductList(query)
  }, [type])


  // Query products on sort or filter change
  useEffect(() => {
    const query = queryBuilder();

    getProductList(query)
  }, [sort, type, search, manufacturer])

  const handleTypeChange = event => {
    navigate(`/products/${event.target.value}`);

    setType(event.target.value)
  }

  return (
    <div className="pl-ctn">
        <Announcement />
        <Navbar />
        <div className="filter-ctn">
            <div className="filter">
                <div className="manu-ctn">
                    <span>Filter products by manufacturer:</span>
                    <select name="manu" id="" onChange={(e) => setManufacturer(e.target.value)}>
                        <option value="">All</option>
                        <option value="AMD">AMD</option>
                        <option value="ASUS">ASUS</option>
                        <option value="ASRock">ASRock</option>
                        <option value="Corsair">Corsair</option>
                        <option value="Kingston">Kingston</option>
                        <option value="GIGABYTE">GIGABYTE</option>
                        <option value="Intel">Intel</option>
                        <option value="MSI">MSI</option>                    
                    </select>
                </div>

                <div className="search-ctn">
                    <span>Search by name: </span>
                    <input 
                        className='search' 
                        type="text" 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon className='search-icon' />
                </div>
            </div>
            <div className="filter">
                <div>
                    <span>Filter products by type:</span>
                    <select name="" id="" onChange={e => handleTypeChange(e)} defaultValue="">
                        { type === undefined || type === '' ? <option value="" selected>All</option> : <option value="">All</option> }
                        { type === "CPU" ? <option value="CPU" selected>CPU</option> : <option value="CPU" >CPU</option> }
                        { type === "GPU" ? <option value="GPU" selected>GPU</option> : <option value="GPU">GPU</option> }
                        { type === "RAM" ? <option value="RAM" selected>RAM</option> : <option value="RAM">RAM</option> }
                        { type === "Mainboard" ? <option value="Mainboard" selected>Mainboard</option> : <option value="Mainboard">Mainboard</option> }               
                    </select>
                </div>
            </div>
            <div className="filter">
                <div>
                    <span>Sort products:</span>
                    <select name="none" id="" onChange={(e) => setSort(e.target.value)}>
                        <option value="none">None</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (asc)</option>
                        <option value="price-desc">Price (desc)</option>
                    </select>
                </div>
            </div>
        </div>
        <hr />
        <Outlet context={[filteredProducts, setFilteredProducts]}/>
        <hr />
        <Footer />
    </div>
  )
}

export default ProductList