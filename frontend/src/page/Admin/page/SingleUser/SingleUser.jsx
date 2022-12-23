import React from 'react'
import { useLocation } from 'react-router-dom'

import './SingleUser.css'

function SingleUser() {

  const location = useLocation();
  const id = location.pathname.split('/')[3];

  console.log(id);

  return (
    <div className="single-user">
        <div className="title-ctn">
          <h1>Edit User</h1>
          <button>Create</button>
        </div>
        <div className='user-info'>
          <div className="show">
            <p>Account details</p>
            <div className="top">
              <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png" alt="" />
              <div className="info">
                <span className="username">Jeff Leonard</span>
                <span>mysticmine69@gmail.com</span>
                <span>ID: {id}</span>
              </div>
            </div>
            {/* <div className="bottom">
              <p className="title">Account details</p>
            </div> */}
          </div>
          <div className="update">
              <p>Edit</p>
              <form action="">
                <div className="left">
                  <div className="field">
                    <label>Username:</label>
                    <input type="text" defaultValue={'Jeff Leonard'}/>
                  </div>
                  <div className="field">
                    <label>Email:</label>
                    <input type="text" defaultValue={'mysticmine69@gmail.com'}/>
                  </div>
                </div>
                <div className="right">
                  <button>Update</button>
                </div>
              </form>
          </div>
        </div>
    </div>
  )
}

export default SingleUser