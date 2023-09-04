import React, { useState, useEffect } from 'react'
import {
    useLocation, useNavigate,
} from 'react-router-dom'
import { publicRequest, userRequest } from '../../requestMethods'

import './SingleProduct.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';

import Navbar from '../../component/NavBar/Navbar'
import Annoucement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer'

import { addProduct, getUserCartStatus } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

function SingleProduct() {

  const dispatch = useDispatch()

  const userState = useSelector(state => state.user.currentUser)
  const cartState = useSelector(state => state.cart)

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
    setAmount(prev => {
        return prev + input;
    })
  }

  const createNewCart = async () => {
    const newCart = {
        userId: userState._id,
        products: [
            {
                productId: id,
                name: product.name,
                img: product.img,
                manufacturer: product.manufacturer,
                price: product.price,
                quantity: amount
            }
        ],
        quantity: amount,
        total: product.price*amount
    }

    const res = await userRequest.post("/cart", newCart)

    if (res) {
        dispatch(getUserCartStatus(true))
    }

    dispatch(addProduct(newCart.products[0]))
  }

  const addToCart = async () => {
    if (!userState.accessToken) {
        window.alert("You are not logged in or your session has expired. Please try again!")
        return;
    }
    
    if (!cartState.status) {
        createNewCart()
        return;
    }

    let updatedCart = {}
    const newProduct = {
        productId: id,
        name: product.name,
        img: product.img,
        manufacturer: product.manufacturer,
        price: product.price,
        quantity: amount
    }

    const newTotal = parseFloat(cartState.total) + product.price*amount

    //Check if product already exist in cart
    const index = cartState.products.findIndex(product => product.productId === id)   

    if (index === -1) { //if no, add new
        updatedCart = {
            userId: userState._id,
            products: [...cartState.products, newProduct],
            quantity: cartState.quantity + amount,
            total: newTotal
        }
    } 
    else { //if yes, increase quantity of that product
        let newProducts = [...cartState.products];

        newProducts[index] = {
            ...newProducts[index],
            quantity: newProducts[index].quantity + amount,
        };

        updatedCart = {
            userId: userState._id,
            products: newProducts,
            quantity: cartState.quantity + amount,
            total: newTotal
        };
    }

    console.log(newTotal)
    await userRequest.put(`/cart/${userState._id}`, updatedCart)
    dispatch(addProduct(newProduct))
  }

  return (
    <div>
        <Annoucement />
        <Navbar />  
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
                    <p className="type">{product.type}</p>
                    {/* <p className="desc"><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nam sit vero libero atque laudantium, totam hic inventore maiores at? Consectetur dolorem soluta placeat commodi inventore voluptatibus perspiciatis. Dicta, aut!</p> */}
                    <p className="desc">Info:</p>
                    {
                        product.info ? 
                        <ul>
                            {
                                product.info.map(item => (
                                    <li>
                                        <p>{item}</p>
                                    </li>
                                ))
                            }
                        </ul> :
                        ""
                    }
                    <p className="year"><b>Release year:</b> {product.releaseYear}</p>
                    <p className="price">${product.price}</p>
                    <p className="stock"><b>Status:</b> In stock</p>
                    <div className="input-ctn">
                        <div className="amount-ctn">
                            <RemoveIcon className='icon' onClick={() => handleChangeAmount(-1)}/>
                            <span className="amount">{amount}</span>
                            <AddIcon className='icon' onClick={() => handleChangeAmount(1)}/>
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

