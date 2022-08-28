import React from 'react'

import './CategoryItem.css'

function CatgoryItem({item}) {
  return (
    <div className="cati-ctn" key={item.id}>
      <img src={item.img} alt="" />
      <div className="info-ctn">
        <h1 className="title">{item.title}</h1>
        <button>PURCHASE NOW</button>
      </div>
    </div>
  )
}

export default CatgoryItem