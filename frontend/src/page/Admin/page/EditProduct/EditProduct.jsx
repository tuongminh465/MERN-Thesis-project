import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './EditProduct.css'

import { userRequest } from '../../../../requestMethods';

function EditProduct() {
  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const [productData, setProductData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentImg, setCurrentImg] = useState("")

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/products/find/${id}`)
        console.log(res.data)
        setProductData(res.data)
        setIsLoading(false)
        setCurrentImg(res.data.img)
      } catch (err) {
        console.log(err)
      }
    }
    
    getProduct();
  }, [id])

  const onImgChange = (e) => {
    setCurrentImg(e.target.value)
  }

  return (
    <div className="edit-product">
        { !isLoading ? 
          <div>
            <div className="title-ctn">
              <h1>Edit Product</h1>
            </div>
            <div className='product-info'>
              <div className="show">
                <p>Product details</p>
                <div className="top">
                  <img src={productData.img} alt="" />
                  <div className="info">
                    <span>ID: {id}</span>
                    <span>Name: {productData.name}</span>
                    <span>Manufacturer: {productData.manufacturer}</span>
                    <span>Type: {productData.type}</span>
                    <span>Information:</span>
                    <ul>
                      {
                        productData.info.map((item) => {
                          return (
                            <li><p>{item}</p></li>
                          )
                        })
                      }
                    </ul>
                    <span>Price: ${productData.price}</span>
                    <span>Release year: {productData.releaseYear}</span>
                  </div>
                </div>
              </div>
              <div className="update">
                  <p>Edit</p>
                  <form action="">
                    <div className="left">
                      <div className="field">
                        <label>Name:</label>
                        <input type="text" defaultValue={productData.name}/>
                      </div>
                      <div className="field">
                        <label>Manufacturer:</label>
                        <input type="text" defaultValue={productData.manufacturer}/>
                      </div>
                      <div className="field">
                        <label>Information:</label>
                        <input type="text" defaultValue={productData.info[0]}/>
                        <input type="text" defaultValue={productData.info[1]}/>
                        <input type="text" defaultValue={productData.info[2]}/>
                        <input type="text" defaultValue={productData.info[3]}/>
                      </div>
                      <div className="field">
                        <label>Price (in USD):</label>
                        <input type="number" defaultValue={productData.price}/>
                      </div>
                      <div className="field">
                        <label>Release year:</label>
                        <input type="number" defaultValue={productData.releaseYear}/>
                      </div>
                    </div>
                    <div className="right">
                      <img 
                        src={
                          currentImg ? 
                          currentImg : 
                          "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                        } 
                        alt="" 
                      />
                      <label htmlFor="product-img-upload">
                        {/* <FileUploadIcon style={{marginRight: 10}}/>
                        Upload product image: */}
                        Input image URL:
                      </label>
                      <input type="text" id="product-img-upload" onChange={(e) => onImgChange(e)}/>
                      <div>
                        <button>Update</button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div> :
          <h1>Fetching data...</h1>
        }
    </div>
  )
}

export default EditProduct