import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCartStatus } from '../../redux/cartSlice'
import { userRequest } from '../../requestMethods'
import { fetchProduct } from '../../redux/cartSlice'

import Announcement from '../../component/Announcement/Announcement'
import Navbar from '../../component/NavBar/Navbar'
import Slider from '../../component/Slider/Slider'
import Category from '../../component/Category/Category'
import Products from '../../component/Products/Products'
import Footer from '../../component/Footer/Footer'
import Chatbot from '../../component/Chatbot/Chatbot'


function Home() {
  
  const dispatch = useDispatch()

  const userState = useSelector(state => state.user.currentUser)
  
  useEffect(() => {
    if(userState) {
      const fetchUserCartStatus = async () => {
      const res =  await userRequest.get(`/cart/find/${userState._id}`)
      
        if (res.data) {
          dispatch(getUserCartStatus(true))
          dispatch(fetchProduct(res.data))
        } else {
          dispatch(getUserCartStatus(false))
        }
      }
      fetchUserCartStatus();
    }
  }, )
  
  
  return (
    <div>
      <Announcement/>
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default Home