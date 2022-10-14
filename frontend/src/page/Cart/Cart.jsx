import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import { userRequest } from '../../requestMethods'
import { useNavigate } from 'react-router-dom'
import { removeProduct, removeAllProduct } from '../../redux/cartSlice'

import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer'
import Navbar from '../../component/NavBar/Navbar'
import './Cart.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Cart() {

  const KEY = "pk_test_51Lj02zFJySGvyCoSjWVG5uSB96KXgN8nErn1GdKHCjqWDpAzItECyLEPtHREprBI6WYT7RgBudS7zlsZXQUiV6Ym00q33dhdQ8";

  const cartState = useSelector(state => state.cart)  

  const [stripeToken, SetStripeToken] = useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  
  const onToken = (token) => {
    SetStripeToken(token)
  }

  const handleRemoveProduct = (_id, amount, price) => {
    const removedProduct = {
        _id,
        amount, 
        price,
    }
    dispatch(removeProduct(removedProduct));
  }

  const handleRemoveAllProduct = () => {
    dispatch(removeAllProduct());
  }

  //create order
  useEffect(() => {
    const makeReq = async () => {
        try{
            const res = await userRequest.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: cartState.total*100,
            })
            navigate("/success", {state: { 
                stripeData: res.data,
                cart: cartState, 
            }})
        } catch(error) {
            console.log(error)
        }
    }

    stripeToken && cartState.total > 0 && makeReq();
  }, [stripeToken, cartState.products, navigate, cartState])

  return (
    <div>
        <Announcement />
        <Navbar />
        <hr />
        <div className="cart-ctn">
            <h1>Your cart</h1>
            <div className="top">
                <button onClick={() => navigate("/products")}>
                    <ShoppingBagIcon style={{marginRight: 10}} />
                    Continue shopping
                </button>
                <div className="text-ctn">
                    <span>Shopping cart({cartState.quantity})</span>
                    <span>Your wishlist(0)</span>
                </div>
                <StripeCheckout
                    name="FStore"
                    image="assets/img/logo.png"
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cartState.total}`}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <button>Checkout now!</button>
                </StripeCheckout>
            </div>
            <div className="bottom">
                <div className="info-ctn">
                    {cartState.products.map(product => (
                        <>
                            <div className="product-ctn">
                                <div className="product">
                                    <img src={product.img} alt="" />
                                    <div className="product-details">
                                        <p><b>Name:</b> {product.name}</p>
                                        <p><b>Manufacturer:</b> {product.manufacturer}</p>
                                        <div className='amount-ctn'><b>Amount:</b> 
                                            <span className="amount">{product.amount}</span>
                                        </div>
                                        <p><b>Insurance:</b> 2 years</p>
                                </div>
                                </div>
                                <div className="price-details">
                                    <p><b>Price:</b> ${product.price}</p>
                                    <p><b>Total price:</b> ${product.price*product.amount}</p>
                                    <button onClick={() => handleRemoveProduct(product._id, product.amount, product.price)}>Remove from cart</button>
                                </div>
                            </div>
                                <hr style={{width: '90%', color: 'gray'}}/>
                        </>
                    ))}    
                    <button 
                        className='rma-btn' 
                        style={{ position: 'relative', bottom: 0, left: '2.5%', marginTop: 20 }}
                        onClick={() => handleRemoveAllProduct()}
                    >
                        Remove all products
                    </button>
                </div>
                <div className="summary-ctn">
                    <h2>Order summary</h2>
                    <div className="item-ctn">
                        <span className="item-text">
                            Subtotal:
                        </span>
                        <span className="item-price">
                            ${cartState.total}
                        </span>
                    </div>
                    <div className="item-ctn">
                        <span className="item-text">
                            Shipping:
                        </span>
                        <span className="item-price">
                            $10
                        </span>
                    </div>
                    <div className="item-ctn">
                        <span className="item-text">
                            Shipping discount:
                        </span>
                        <span className="item-price">
                            -100%
                        </span>
                    </div>
                    <div className="item-ctn">
                        <span className="item-text" >
                            <b>Total:</b> 
                        </span>
                        <span className="item-price">
                            ${cartState.total}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Cart