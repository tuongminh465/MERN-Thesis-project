import React from 'react'

import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MapIcon from '@mui/icons-material/Map';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className="footer-ctn">
        <div className="left">
            <h1 className="logo">FStore.</h1>
            <p className="desc">
                Fun. Fast. Flawless - This has always been the motto of our store. 
                We aim to provide the best experience and products to our customer,
                alongside with reasonable pricing and timely service.</p>
            <div className="icon-ctn">
                <div className="icon" style={{backgroundColor: '#3b5998'}}><FacebookIcon /></div>
                <div className="icon" style={{backgroundColor: '#1DA1F2'}}><TwitterIcon /></div>
                <div className="icon" style={{backgroundColor: 'red'}}><YouTubeIcon /></div>
            </div>
        </div>
        <div className="center">
            <h2>Some useful links</h2>
            <ul className='list'>
                <li className="item">
                    <a href="google.com">Home</a>
                </li>
                <li className="item">
                    <a href="google.com">Log in</a>
                </li>
                <li className="item">
                    <a href="google.com">Register</a>
                </li>
                <li className="item">
                    <a href="google.com">My cart</a>
                </li>
                <li className="item">
                    <a href="google.com">My account</a>
                </li>
                <li className="item">
                    <a href="google.com">Terms of Service</a>
                </li>
            </ul>
        </div>
        <div className="right">
            <h1>Contacts</h1>
            <p className="contact-item">
                <MapIcon />: 250, Võ Văn Kiệt, Quận 7, Hồ Chí Minh
            </p>
            <p className="contact-item">
                <LocalPhoneIcon/>: +84 7103 738 999
            </p>
            <p className="contact-item">
                <EmailIcon />: FStore@gmail.com
            </p>
            <img src="/assets/img/payment.jpg" alt="" />
        </div>
    </div>
  )
}

export default Footer