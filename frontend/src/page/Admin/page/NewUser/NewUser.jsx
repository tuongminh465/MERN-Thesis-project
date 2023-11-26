import React, { useRef, useState } from 'react'
import { userRequest } from '../../../../requestMethods';

import './NewUser.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NewUser() {

  const [error, setError] = useState("")
  const [admin, setAdmin] = useState(false)

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!usernameRef.current.value || 
        !emailRef.current.value ||
        !passwordRef.current.value ) 
    {
        setError("Fields cannot be empty")
        return;
    }

    if (!emailRef.current.value.match(emailRegex)) {
        setError("Invalid email")
        return;
    }

    if (passwordRef.current.value.trim().length < 6) {
        setError("Password must contains at least 6 characters!")
        return;
    }
    
    const newUser = {
        username: usernameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
        isAdmin: admin,
    }

    console.log(newUser);
    try {
        const res = await userRequest.post(`/auth/register`, newUser);

        window.alert(`User successfully created! User id: ${res.data._id}`)

        setError("")
    } catch (err) {
        console.log(err);
        const errCode = err.response.data.code
        if (errCode === 11000 || errCode === "11000") {
            setError("Username or email already registered for an account!")
        }
    }
  }

  return (
    <div className="new-user">
        <h1>New User</h1>
        <form action="">
            <div className="field">
                <label>
                    Username
                    <span style={{color: 'red'}}> *</span>
                </label>
                <input type="text" placeholder='Enter new username here...' ref={usernameRef} />
            </div>
            <div className="field">
                <label>
                    Email
                    <span style={{color: 'red'}}> *</span>
                </label>
                <input type="email" placeholder='Enter email here...' ref={emailRef} />
            </div>
            <div className="field">
                <label>
                    Password 
                    <span style={{color: 'red'}}> *</span>
                </label>
                <input type="password" placeholder='Enter new password here...' ref={passwordRef} />
            </div>
            <div className="field">
                <label>
                    Admin status 
                    <span style={{color: 'red'}}> *</span>
                </label>
                <div className="admin-status">
                    <div>
                        <label>True</label>
                        <input 
                            name="status" type="radio" value={true}
                            onClick={() => setAdmin(true)}
                        />
                    </div>
                    <div>
                        <label>False</label>
                        <input 
                            name="status" type="radio" 
                            value={false} defaultChecked="checked"
                            onClick={() => setAdmin(false)}
                        />
                    </div>
                </div>
            </div>
            <p id='error'>{error}</p>
            <button type="submit" onClick={(e) => onCreate(e)}>Create</button>
        </form>
    </div>
  )
}

export default NewUser