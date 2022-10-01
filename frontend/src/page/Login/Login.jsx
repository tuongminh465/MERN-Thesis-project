import React from 'react'

import { useNavigate } from "react-router-dom";

import './Login.css'
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

function Login() {
  
  const navigate = useNavigate();

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
                <input type="text" name='username' placeholder='Enter your username...'/>
                <label htmlFor="username">Password:</label>
                <input type="password" name='password' placeholder='Enter your password...'/>
                <p>
                    Don't remember your password? Click <a href="google.com">here</a>!.
                </p>
                <button>
                  <LoginIcon style={{position: 'relative', marginRight: 15, top: 5}} />
                  Shop now!
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login