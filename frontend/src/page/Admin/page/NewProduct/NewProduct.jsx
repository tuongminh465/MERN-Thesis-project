import React, { useRef, useState } from 'react'
import { userRequest } from '../../../../requestMethods';

import './NewProduct.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';


function NewProduct() {

  const [productImg, setProductImg] = useState("https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png")
  const [error, setError] = useState("");

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

  const onImgChange = (e) => {
    setProductImg(e.target.value)
  }

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
      setError("Fields cannot be empty");
      return;
    }

    const newProduct = {
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
      const res = await userRequest.post("/products", newProduct)
      console.log(res)
      window.alert("New product successfully added!")
    } catch (err) {
      console.log(err)
      const errCode = err.response.data.code
      if (errCode === 11000 || errCode === "11000") {
        setError("Cannot have 2 products of the same name!")
      }
    }
    console.log(newProduct)
  }

  return (
    <div className="new-product">
      <h1>New Product</h1>
      <form action="">
        <div className="left">
          <div className="field">
            <label>Name: </label>
            <input type="text" placeholder='Enter product name here...' ref={nameRef} />
          </div>
          <div className="field">
            <label>Manufacturer: </label>
            <input type="email" placeholder='Enter product manufacturer here...' ref={manuRef}/>
          </div>
          <div className="field">
            <label>Type: </label>
            <select name="type" id="" defaultValue="" ref={typeRef}>
              <option value="" disabled>Select product type</option>
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="RAM">RAM</option>
              <option value="Mainboard">Mainboard</option>
            </select>
          </div>
          <div className="field">
            <label>Information: </label>
            <input type="text" placeholder='Enter product info 1 here...' ref={infoRef1}/>
            <input type="text" placeholder='Enter product info 2 here...' ref={infoRef2}/>
            <input type="text" placeholder='Enter product info 3 here...' ref={infoRef3}/>
            <input type="text" placeholder='Enter product info 4 here...' ref={infoRef4}/>
          </div>
          <div className="field">
            <label>Price (in USD): </label>
            <input type="number" placeholder='Enter product price here...' ref={priceRef}/>
          </div>
          <div className="field">
            <label>Release year: </label>
            <input type="number" placeholder='Enter product release year here...' ref={yearRef}/>
          </div>
        </div>
        <div className="right">
          <img src={productImg} alt="" />
          <div className="field">
            <label htmlFor="product-img-upload">
              <FileUploadIcon style={{marginRight: 10}}/>
              Upload product image:
            </label>
            <input 
              type="text" placeholder='Enter product image URL here...' 
              ref={imgRef} onChange={(e) => onImgChange(e)}
            />
          </div>
          <button 
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Create
          </button>
          <p id="error">{error}</p>
        </div>  
      </form>
    </div>
  )
}

export default NewProduct