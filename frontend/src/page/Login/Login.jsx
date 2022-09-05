import React from 'react'

import './Login.css'

function Login() {
  return (
    <div className="login-ctn">
        <div className="router-ctn">
          <span>Don't have an account?</span>
          <button>Register now!</button>
        </div>
        <div className="wrapper">
            <h1>Log in</h1>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' placeholder='Enter your username...'/>
                <label htmlFor="username">Password:</label>
                <input type="password" name='password' placeholder='Enter your password...'/>
                <p>
                    Don't remember your password? Click <a href="google.com">here</a>!.
                </p>
                <button>Shop now!</button>
            </form>
        </div>
    </div>
  )
}

export default Login