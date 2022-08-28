import React from 'react'

import Announcement from '../../component/Announcement/Announcement'
import Navbar from '../../component/NavBar/Navbar'
import Slider from '../../component/Slider/Slider'
import Category from '../../component/Category/Category'
import Products from '../../component/Products/Products'
import Footer from '../../component/Footer/Footer'

function Home() {
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