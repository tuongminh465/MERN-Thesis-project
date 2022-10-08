import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import './Login.css'
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { userRequest } from '../../requestMethods';

function Login() {
  
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const user = {
      userName,
      password,
    }

    dispatch(loginStart())
    try {
      const res = await userRequest.post("auth/login", user)
      dispatch(loginSuccess(res.data))
    } catch (err) {
      let errorMessage = err.response.data
      console.log(errorMessage)
      dispatch(loginFailure);
      setError(errorMessage)
    }
  }

  return (
    <div className="login-ctn">
        <div className="router-ctn">
          <span>Don't have an account?</span>
          <button onClick={() => navigate('/register')} >Register now!</button>
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
            <h1>Hello there!</h1>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' placeholder='Enter your username...'
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="username">Password:</label>
                <input  name='password' placeholder='Enter your password...'
                  onChange={(e) => setPassword(e.target.value)}
                />
                { error ? <p style={{color: 'red', fontSize: 16}}>{error}</p> : ""}
                <button onClick={(e) => handleLogin(e)}>
                  <LoginIcon style={{position: 'relative', marginRight: 15, top: 5}} />
                  Shop now!
                </button>
                <p>
                  Don't remember your password? Click <a href="google.com">here</a>!.
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login