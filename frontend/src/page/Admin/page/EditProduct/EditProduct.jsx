import React from 'react'
import { useLocation } from 'react-router-dom'

import './EditProduct.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';

function EditProduct() {
  const location = useLocation();
  const id = location.pathname.split('/')[3];

  return (
    <div className="edit-product">
        <div className="title-ctn">
          <h1>Edit Product</h1>
        </div>
        <div className='product-info'>
          <div className="show">
            <p>Product details</p>
            <div className="top">
              <img src="https://phucanhcdn.com/media/product/42984_core_9.jpg" alt="" />
              <div className="info">
                <span>ID: {id}</span>
                <span>Name: CPU Intel Core i9-11900K</span>
                <span>Manufacturer: Intel</span>
                <span>Type: CPU</span>
                <span>Information:</span>
                <ul>
                  <li><p>8 cores</p></li>
                  <li><p>16 threads</p></li>
                  <li><p>Frequency: 3.5-5.3 GHz</p></li>
                  <li><p>GPU clock: 2300 MHz</p></li>
                </ul>
                <span>Price: $369.99</span>
                <span>Release year: 2022</span>
              </div>
            </div>
          </div>
          <div className="update">
              <p>Edit</p>
              <form action="">
                <div className="left">
                  <div className="field">
                    <label>Name:</label>
                    <input type="text" defaultValue={'CPU Intel Core i9-11900K'}/>
                  </div>
                  <div className="field">
                    <label>Manufacturer:</label>
                    <input type="text" defaultValue={'Intel'}/>
                  </div>
                  <div className="field">
                    <label>Information:</label>
                    <input type="text" defaultValue={'8 cores'}/>
                    <input type="text" defaultValue={'16 threads'}/>
                    <input type="text" defaultValue={'Frequency: 3.5-5.3 GHz.'}/>
                    <input type="text" defaultValue={'GPU clock: 2300 MHz'}/>
                  </div>
                  <div className="field">
                    <label>Price:</label>
                    <input type="number" defaultValue={'369.99'}/>
                  </div>
                  <div className="field">
                    <label>Release year:</label>
                    <input type="number" defaultValue={'2022'}/>
                  </div>
                </div>
                <div className="right">
                  <img src="https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png" alt="" />
                  <label htmlFor="product-img-upload">
                    <FileUploadIcon style={{marginRight: 10}}/>
                    Upload product image:
                  </label>
                  <input type="file" id="product-img-upload" style={{display: 'none'}}/>
                  <div>
                    <button>Update</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
    </div>
  )
}

export default EditProduct