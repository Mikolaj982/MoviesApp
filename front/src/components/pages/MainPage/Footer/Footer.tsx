import React from 'react';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import './Footer.scss';

export const Footer = () => {
    return <>
        <div className='main-page-container__footer'>
            <div className='main-page-container__footer__info'>
                <p>2023 All Rights Reserved</p><a href='components/MainPage/Footer/Footer#'>Terms & Conditions</a><a
                href='components/MainPage/Footer/Footer#'>Privacy Policy</a>
            </div>
            <div className='main-page-container__footer__contact'>
                <FacebookIcon/>
                <TwitterIcon/>
                <InstagramIcon/>
            </div>
        </div>
    </>
}