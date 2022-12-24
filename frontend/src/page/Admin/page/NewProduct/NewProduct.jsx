import React from 'react'

import './NewProduct.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';

function NewProduct() {
  return (
    <div className="new-product">
      <h1>New Product</h1>
      <form action="">
        <div className="left">
          <div className="field">
            <label>Name: </label>
            <input type="text" placeholder='Enter product name here...'/>
          </div>
          <div className="field">
            <label>Manufacturer: </label>
            <input type="email" placeholder='Enter product manufacturer here...'/>
          </div>
          <div className="field">
            <label>Type: </label>
            <input type="password" placeholder='Enter product type here...'/>
          </div>
          <div className="field">
            <label>Information: </label>
            <input type="password" placeholder='Enter product info 1 here...'/>
            <input type="password" placeholder='Enter product info 2 here...'/>
            <input type="password" placeholder='Enter product info 3 here...'/>
            <input type="password" placeholder='Enter product info 4 here...'/>
          </div>
          <div className="field">
            <label>Price (in USD): </label>
            <input type="number" placeholder='Enter product price here...'/>
          </div>
          <div className="field">
            <label>Release year: </label>
            <input type="number" placeholder='Enter product release year here...'/>
          </div>
        </div>
        <div className="right">
          <img src="https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png" alt="" />
          <label htmlFor="product-img-upload">
            <FileUploadIcon style={{marginRight: 10}}/>
            Upload product image:
          </label>
          <input type="file" id="product-img-upload" style={{display: 'none'}}/>
          <button>Create</button>
        </div>  
      </form>
    </div>
  )
}

export default NewProduct