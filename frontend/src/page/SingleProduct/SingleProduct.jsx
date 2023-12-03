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
    try {
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

        window.alert(`Added ${newCart.products[0].quantity} ${newCart.products[0].name} to cart successfully!`)
    } catch (error) {
        console.log(error)
    }
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

    try {
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

        await userRequest.put(`/cart/${userState._id}`, updatedCart)
        dispatch(addProduct(newProduct))

        window.alert(`Added ${newProduct.quantity} ${newProduct.name} to cart successfully!`)
    } 
    catch (error) {
        console.log(error)
    }
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
                    <p className="section-header">${product.price}</p>
                    <br />
                    <p className="section-header">{product.type}</p>
                    <p className="section-header">Info</p>
                    {
                        product.info ? 
                        <ul>
                            {
                                product.info.map(item => (
                                    <li>
                                        <p style={{ fontSize: 24 }}>{item}</p>
                                    </li>
                                ))
                            }
                        </ul> :
                        ""
                    }
                    <p>
                        <span className="section-header">Release year: </span>
                        {product.releaseYear}
                    </p>
                    <p>
                        <span className="section-header">Status: </span>
                        In stock
                    </p>
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

