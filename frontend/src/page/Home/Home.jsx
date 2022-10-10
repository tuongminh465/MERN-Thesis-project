import React from 'react'

import { useSelector } from 'react-redux'

import Announcement from '../../component/Announcement/Announcement'
import Navbar from '../../component/NavBar/Navbar'
import Slider from '../../component/Slider/Slider'
import Category from '../../component/Category/Category'
import Products from '../../component/Products/Products'
import Footer from '../../component/Footer/Footer'

function Home() {
  const userState = useSelector(state => state.user)

  console.log(userState.currentUser)
  
  return (
    <div>
      <Announcement/>
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Footer />
    </div>
  )
}

export default Home