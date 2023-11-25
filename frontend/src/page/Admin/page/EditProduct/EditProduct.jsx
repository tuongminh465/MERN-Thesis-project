import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import './EditProduct.css'

import { userRequest } from '../../../../requestMethods';

function EditProduct() {
  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const [productData, setProductData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [currentImg, setCurrentImg] = useState("https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png")
  const [error, setError] = useState("")
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/products/find/${id}`)

        setProductData(res.data)
        setCurrentImg(res.data.img)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    
    getProduct();
  }, [id])

  const onImgChange = (e) => {
    setCurrentImg(e.target.value)
  }

  const nameRef = useRef();
  const manuRef = useRef();
  const typeRef = useRef();
  const infoRef1 = useRef();
  const infoRef2 = useRef();
  const infoRef3 = useRef();
  const infoRef4 = useRef();
  const priceRef = useRef();
  const yearRef = useRef();
  const imgRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !nameRef.current.value ||
        !manuRef.current.value ||
        !typeRef.current.value ||
        !infoRef1.current.value ||
        !infoRef2.current.value ||
        !infoRef3.current.value ||
        !infoRef4.current.value ||
        !priceRef.current.value ||
        !yearRef.current.value ||
        !imgRef.current.value ) 
    {
      setError("Fields cannot be empty!");
      return;
    }

    const updatedProduct = {
      name: nameRef.current.value.trim(),
      img: imgRef.current.value.trim(),
      maufacturer: manuRef.current.value.trim(),
      type: typeRef.current.value.trim(),
      info: [
        infoRef1.current.value.trim(),
        infoRef2.current.value.trim(),
        infoRef3.current.value.trim(),
        infoRef4.current.value.trim(),
      ],
      price: priceRef.current.value,
      releaseYear: yearRef.current.value,
    }

    try {
      const res = await userRequest.put(`/products/${productData._id}`, updatedProduct)

      console.log(res)

      window.alert(`Product ${productData._id} updated successfully!`)
    } 
    catch (err) {
      const errCode = err.response.data.code

      if (errCode === 11000 || errCode === "11000") {
        setError("Cannot have 2 products of the same name!")
      }
    }
  }

  return (
    <div className="edit-product">
        { !isLoading ? 
          <div>
            <div className="title-ctn">
              <h1 style={{ color: 'white' }}>Edit Product</h1>
            </div>
            <div className='product-info'>
              <div className="update">
                  <form action="">
                    <div className="left">
                      <div className="field">
                        <label>Name:</label>
                        <input type="text" defaultValue={productData.name} ref={nameRef}/>
                      </div>
                      <div className="field">
                        <label>Manufacturer:</label>
                        <input type="text" defaultValue={productData.manufacturer} ref={manuRef}/>
                      </div>
                      <div className="field">
                        <label>Type: </label>
                        <select name="type" id="" defaultValue={productData.type} ref={typeRef}>
                          <option value="" disabled>Select product type</option>
                          <option value="CPU">CPU</option>
                          <option value="GPU">GPU</option>
                          <option value="RAM">RAM</option>
                          <option value="Mainboard">Mainboard</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Information:</label>
                        <input type="text" defaultValue={productData.info[0]} ref={infoRef1} />
                        <input type="text" defaultValue={productData.info[1]} ref={infoRef2} />
                        <input type="text" defaultValue={productData.info[2]} ref={infoRef3} />
                        <input type="text" defaultValue={productData.info[3]} ref={infoRef4} />
                      </div>
                      <div className="field">
                        <label>Price (in USD):</label>
                        <input type="number" defaultValue={productData.price} ref={priceRef}/>
                      </div>
                      <div className="field">
                        <label>Release year:</label>
                        <input type="number" defaultValue={productData.releaseYear} ref={yearRef}/>
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
                        Input image URL:
                      </label>
                      <input 
                        type="text" id="product-img-upload" 
                        onChange={(e) => onImgChange(e)}
                        defaultValue={currentImg}
                        ref={imgRef}
                      />
                      <div>
                        <button 
                          type='submit'
                          onClick={(e) => handleSubmit(e)}
                        >
                          Update
                        </button>
                        <p id="error">{error}</p>
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