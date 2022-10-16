import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import './Login.css'
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { publicRequest } from '../../requestMethods';

function Login() {
  
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const isFetching = useSelector(state => state.user.isFetching)

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      setError("Fields cannot be empty!")
    }
    const user = {
      username: usernameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    }

    console.log(user)

    dispatch(loginStart())
    try {
      const res = await publicRequest.post("auth/login", user)
      dispatch(loginSuccess(res.data))
      setError("")
    } catch (err) {
      dispatch(loginFailure());
      let errorMessage = err.response.data
      console.log(errorMessage)
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
                <label htmlFor="username">Username: <span style={{ color: "red"}}>*</span></label>
                <div>
                  <input 
                    type="text" 
                    name='username' 
                    placeholder='Enter your username...'
                    ref={usernameRef}
                  />
                </div>
                <label htmlFor="username">Password: <span style={{ color: "red"}}>*</span></label>
                <div>
                  <input  
                    type={ showPassword ? "text" : "password" }
                    name='password' 
                    placeholder='Enter your password...'
                    ref={passwordRef}
                  />
                  { 
                    showPassword ? 
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(false)} 
                      className="vis-icon" 
                      style={{position: 'absolute', top: '18%', right: 0}}
                    /> :
                    <VisibilityIcon 
                      onClick={() => setShowPassword(true)} 
                      className="vis-icon" 
                      style={{position: 'absolute', top: '18%', right: 0}}
                    />
                  }
                </div>
                { error ? <p style={{color: 'red', fontSize: 16}}>{error}</p> : ""}
                <div>
                  <button 
                    onClick={(e) => handleLogin(e)}
                    // disabled={isFetching}
                  >
                    <LoginIcon style={{position: 'relative', marginRight: 15, top: 5}} />
                    Shop now!
                  </button>
                </div>
                {/* <p>
                  Don't remember your password? Click <a href="google.com">here</a>!.
                </p> */}
            </form>
        </div>
    </div>
  )
}

export default Login