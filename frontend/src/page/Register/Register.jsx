import React, { useState } from 'react'

import { useAsyncError, useNavigate } from "react-router-dom";

import './Register.css'
import HomeIcon from '@mui/icons-material/Home';
import { publicRequest } from '../../requestMethods';

function Register() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password does not match!")
      return;
    }

    const newUser = {
      username,
      email,
      password,
    }

    try {
      const res = await publicRequest.post("auth/register", newUser)
      console.log(res)
    } catch (err) {
      console.log(err)
    }

    console.log("Register")
  }

  return (
    <div className="register-ctn">
        <div className="router-ctn">
          <span>Already have an account?</span>
          <button onClick={() => navigate('/login')}>Login now!</button>
        </div>
        <div className="home-ctn">
          <button onClick={() => navigate('/')} >
            <HomeIcon style={{position: 'relative', top: 0, marginRight: 10}} />
            <span style={{position: 'relative', display: 'inline-block', bottom: 5}}>
              Return to Home page
            </span>
          </button>
        </div>
        <div className="wrapper">
            <h1>Create an account</h1>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  name='username' 
                  placeholder='Enter your username...'
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  name='email' 
                  placeholder='Enter your email...'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="username">Password:</label>
                <input 
                  type="password" 
                  name='password' 
                  placeholder='Enter your password...'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirm-password">Confirm password:</label>
                <input 
                  type="password" 
                  name='confirm-password' 
                  placeholder='Confirm your password...'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p>
                  By creating an account, you accept our <a href="google.com">Terms of Service</a> and <a href="google.com">Privacy Policy</a>.
                </p>
                <button onClick={(e) => handleRegister(e)}>Join now!</button>
            </form>
        </div>
    </div>
  )
}

export default Register