import React, { useState } from 'react'

import './SingleProduct.css'
import Navbar from '../../component/NavBar/Navbar'
import Annoucement from '../../component/Announcement/Announcement'
import Footer from '../../component/Footer/Footer'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SingleProduct() {

  const [amount, setAmount] = useState(1)  
  
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

  return (
    <div>
        <Navbar />
        <Annoucement />
        <div className="sp-ctn">
            <div className="wrapper">
                <div className="img-ctn">
                    <img src="/assets/products/product1.jpg" alt="" />
                </div>
                <div className="info-ctn">
                    <h1>MSI Geforce RTX™ 3080 GAMING Z TRIO 10GB GDDR6X (LHR)</h1>
                    <p className="type">GPU</p>
                    <p className="desc"><b>Description:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nam sit vero libero atque laudantium, totam hic inventore maiores at? Consectetur dolorem soluta placeat commodi inventore voluptatibus perspiciatis. Dicta, aut!</p>
                    <p className="year"><b>Release year:</b> 2021</p>
                    <p className="price">$1799.99</p>
                    <p className="stock"><b>Stock:</b> 10</p>
                    <div className="input-ctn">
                        <div className="amount-ctn">
                            <RemoveIcon className='icon' onClick={() => handleChangeAmount('remove')}/>
                            <span className="amount">{amount}</span>
                            <AddIcon className='icon' onClick={() => handleChangeAmount('add')}/>
                        </div>
                        <button>
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