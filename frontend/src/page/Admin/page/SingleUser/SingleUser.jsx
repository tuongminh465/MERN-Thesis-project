import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { userRequest } from '../../../../requestMethods';

import './SingleUser.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SingleUser() {

  const [userData, setUserData] = useState("")
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation();
  const id = location.pathname.split('/')[3];

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest(`users/find/${id}`);
        setUserData(res.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [id])

  const usernameRef = useRef();
  const emailRef = useRef()

  const updateUser = async (e) => {
    e.preventDefault();

    if (!usernameRef.current.value || !emailRef.current.value) {
      setError("Fields cannot be empty!")
      return
    }

    if (!emailRef.current.value.match(emailRegex)) {
      setError("Invalid email")
      return;
  }

    const updatedUser = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim()
    }

    try {
      await userRequest.put(`/users/${id}`, updatedUser);

      window.alert("User succesfully updated!")

      setError("")
    } catch(err) {
      console.log(err)
      const errCode = err.response.data.code
      
      if (errCode === 11000 || errCode === "11000") {
        setError("Cannot have 2 users of the same name!")
      }
    }
  }

  return (
    <div className="single-user">
        {
          isLoading ? 
          <h1>Fetching data...</h1> :
          <div>
            <div className="title-ctn">
              <h1 style={{ color: 'white' }}>Edit User</h1>
            </div>
            <div className='user-info'>
              <div className="show">
                <p>Account details</p>
                <div className="top">
                  <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
                  <div className="info">
                    <span className="username">{userData.username}</span>
                    <span>{userData.email}</span>
                    <span>ID: {id}</span>
                  </div>
                </div>
              </div>
              <div className="update">
                  <p>Edit</p>
                  <form action="">
                    <div className="left">
                      <div className="field">
                        <label>Username:</label>
                        <input type="text" defaultValue={userData.username} ref={usernameRef}/>
                      </div>
                      <div className="field">
                        <label>Email:</label>
                        <input type="text" defaultValue={userData.email} ref={emailRef}/>
                      </div>
                    </div>
                    <div className="right">
                      <button onClick={(e) => updateUser(e)}>Update</button>
                      <span id='error'>{error}</span>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default SingleUser