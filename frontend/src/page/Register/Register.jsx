import React from 'react'

import './Register.css'

function Register() {
  return (
    <div className="register-ctn">
        <div className="router-ctn">
          <span>Already have an account?</span>
          <button>Login now!</button>
        </div>
        <div className="wrapper">
            <h1>Create an account</h1>
            <form action="">
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' placeholder='Enter your username...'/>
                <label htmlFor="email">Email:</label>
                <input type="text" name='email' placeholder='Enter your email...'/>
                <label htmlFor="username">Password:</label>
                <input type="password" name='password' placeholder='Enter your password...'/>
                <label htmlFor="confirm-password">Confirm password:</label>
                <input type="password" name='confirm-password' placeholder='Confirm your password...'/>
                <p>
                    By creating an account, you accept our <a href="google.com">Terms of Service</a> and <a href="google.com">Privacy Policy</a>.
                </p>
                <button>Join now!</button>
            </form>
        </div>
    </div>
  )
}

export default Register