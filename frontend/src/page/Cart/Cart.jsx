import React from 'react'

import Announcement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer'
import Navbar from '../../component/NavBar/Navbar'
import './Cart.css'

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Cart() {
  return (
    <div>
        <Announcement />
        <Navbar />
        <hr />
        <div className="cart-ctn">
            <h1>Your cart</h1>
            <div className="top">
                <button>Continue shopping</button>
                <div className="text-ctn">
                    <span>Shopping bag(2)</span>
                    <span>Your wishlist(0)</span>
                </div>
                <button>Checkout now!</button>
            </div>
            <div className="bottom">
                <div className="info-ctn">
                    <div className="product-ctn">
                        <div className="product">
                            <img src="/assets/products/product1.jpg" alt="" />
                            <div className="product-details">
                                <p><b>Name:</b> MSI RTX 3080</p>
                                <p><b>Manufacturer:</b> MSI</p>
                                <div className='amount-ctn'><b>Amount:</b> 
                                    <RemoveIcon className='icon'/>
                                    <span className="amount">1</span>
                                    <AddIcon className='icon'/>
                                </div>
                                <p><b>Insurance:</b> 2 years</p>
                            </div>
                        </div>
                        <div className="price-details">
                            <p><b>Price:</b> $1799.99</p>
                            <p><b>Total price:</b> $1799.99</p>
                        </div>
                        
                    </div>
                    <hr style={{width: '90%', color: 'gray'}}/>
                    <div className="product-ctn">
                        <div className="product">
                            <img src="/assets/products/product1.jpg" alt="" />
                            <div className="product-details">
                                <p><b>Name:</b> MSI RTX 3080</p>
                                <p><b>Manufacturer:</b> MSI</p>
                                <div className='amount-ctn'><b>Amount:</b> 
                                    <RemoveIcon className='icon'/>
                                    <span className="amount">1</span>
                                    <AddIcon className='icon'/>
                                </div>
                                <p><b>Insurance:</b> 2 years</p>
                            </div>
                        </div>
                        <div className="price-details">
                            <p><b>Price:</b> $1799.99</p>
                            <p><b>Total price:</b> $1799.99</p>
                        </div>
                        
                    </div>
                </div>
                <div className="summary-ctn">
                    <h2>Order summary</h2>
                    <div className="item-ctn">
                        <span className="item-text">
                            Subtotal:
                        </span>
                        <span className="item-price">
                            $2599.98
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
                            $2599.98$
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