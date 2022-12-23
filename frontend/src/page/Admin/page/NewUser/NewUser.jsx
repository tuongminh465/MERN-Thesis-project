import React from 'react'

import './NewUser.css'

function NewUser() {
  return (
    <div className="new-user">
        <h1>New User</h1>
        <form action="">
            <div className="field">
                <label>Username: </label>
                <input type="text" placeholder='Enter new username here...'/>
            </div>
            <div className="field">
                <label>Email: </label>
                <input type="email" placeholder='Enter email here...'/>
            </div>
            <div className="field">
                <label>Password: </label>
                <input type="password" placeholder='Enter new password here...'/>
            </div>
            <div className="field">
                <h3>Admin status: </h3>
                <div className="admin-status">
                    <div>
                        <label>True</label>
                        <input name="status" type="radio" value={true} />
                    </div>
                    <div>
                        <label>False</label>
                        <input name="status" type="radio" value={false} />
                    </div>
                </div>
            </div>
            <button>Create</button>
        </form>
    </div>
  )
}

export default NewUser