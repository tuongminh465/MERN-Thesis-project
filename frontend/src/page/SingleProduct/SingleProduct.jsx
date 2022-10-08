import React, { useState, useEffect } from 'react'
import {
    useLocation, useNavigate,
} from 'react-router-dom'
import { publicRequest } from '../../requestMethods'

import './SingleProduct.css'
import Navbar from '../../component/NavBar/Navbar'
import Annoucement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { addProduct } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux'

function SingleProduct() {

  const dispatch = useDispatch()

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const navigate = useNavigate();

  const [product, setProduct] = useState({})
  const [amount, setAmount] = useState(1)  

  useEffect(() => {
    const getProduct = async () => {
        try {
            const res = await publicRequest.get(`/products/find/${id}`)

            setProduct(res.data)
        } catch(err){
            console.log(err)
        }
    }

    getProduct()
  }, [id])
  
  const handleChangeAmount = (input) => {
    let newAmount = amount
    if (input === 'add') {
        newAmount++;
        setAmount(newAmount);
    }
    else if (input === 'remove' && amount > 1) {
        newAmount--;
        setAmount(newAmount--);
    }
    else {
        console.log(amount);
    }
  }

  const addToCart = () => {
    dispatch(addProduct({ ...product, amount}))
  }

  return (
    <div>
        <Navbar />
        <Annoucement />
        <div className="spd-ctn">
            <button className='back-btn' onClick={() => navigate("/products")}>
                <ShoppingBagIcon style={{marginRight: 10}}/>
                Back to products page
            </button>
            <div className="wrapper">
                <div className="img-ctn">
                    <img src={product.img} alt="" />
                </div>
                <div className="info-ctn">
                    <h1>{product.name}</h1>
                    <p className="type">GPU</p>
                    <p className="desc"><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nam sit vero libero atque laudantium, totam hic inventore maiores at? Consectetur dolorem soluta placeat commodi inventore voluptatibus perspiciatis. Dicta, aut!</p>
                    <p className="year"><b>Release year:</b> {product.releaseYear}</p>
                    <p className="price">${product.price}</p>
                    <p className="stock"><b>Stock:</b> 10</p>
                    <div className="input-ctn">
                        <div className="amount-ctn">
                            <RemoveIcon className='icon' onClick={() => handleChangeAmount('remove')}/>
                            <span className="amount">{amount}</span>
                            <AddIcon className='icon' onClick={() => handleChangeAmount('add')}/>
                        </div>
                        <button onClick={() => addToCart()}>
                            <AddShoppingCartIcon style={{marginRight: 10}} />
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>  
    )
}

export default SingleProduct