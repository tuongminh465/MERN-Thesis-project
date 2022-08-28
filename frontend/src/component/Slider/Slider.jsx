import React, {useState} from 'react'

import { slides } from '../data';

import './Slider.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Slider() {

  const [slideIndex, setSlideIndex] = useState(0)  
  
  const handleClick = (direction) => {
    if (direction === 'left') {
        setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
    } else {
        setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
    }
    
    console.log(slideIndex);
  }

  

  return (
    <div className="slider-ctn">
        <div className="arrow" style={{left: 10}} onClick={() => handleClick('left')}>
            <ArrowBackIosIcon />
        </div>
        <div className="wrapper">
            {
                slides.filter(slide => slide.id === slideIndex).map(slide => 
                    <div className="slide" style={{background: slide.bg}} key={slide.id}>
                        <div className="img-ctn">
                            <img src={slide.img} alt="" />
                        </div>
                        <div className="info-ctn">
                            <h1 className="title">{slide.title}</h1>
                            <p className="desc">{slide.desc}</p>
                            <button>SHOW MORE</button>
                        </div>
                    </div>
                )
            }
        </div>
        <div className="arrow" style={{right: 10}} onClick={() => handleClick('left')}>
            <ArrowForwardIosIcon />
        </div>
    </div>
  )
}

export default Slider