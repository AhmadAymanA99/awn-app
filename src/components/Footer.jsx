import React from 'react';
import "./style/footer.scss"
import logo2 from './style/logo2.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footerHolder">
            <div>
                <div className="row">
                    <div className="leftFooter col-sm-12 col-md-6 col-lg-4 col-xs-12">
                        <h3>Categories</h3>
                        <Link to="/volunteering">Volunteering</Link> <br />
                        <Link to="/donations">Donations</Link> <br />
                        <Link to="/recycling">Recycling</Link> <br />
                    </div>
                    <div className="footerCenter col-sm-12 col-md-6 col-lg-4">
                        <Link to='/'>
                            <img className='logo2' src={logo2} alt='awn-logo' /> <br />
                        </Link>
                        <Link to="/about">About US</Link>
                    </div>
                    <div className="rightFooter col-sm-12 col-md-6 col-lg-4">
                        <h3>Contact us on</h3>
                        <Link to="#" className="Facebook"><img src="https://image.flaticon.com/icons/svg/124/124010.svg" alt="Facebook" /></Link>
                        <Link to="#" className="Twitter"><img src="https://image.flaticon.com/icons/svg/733/733579.svg" alt="Twitter" /></Link>
                        <Link to="#" className="Instgram"><img src="https://image.flaticon.com/icons/svg/1409/1409946.svg" alt="Instgram" /></Link>
                    </div>
                </div>
            </div>
            <div className="copyRights">
                <h5>All rights reserved to  AWN team &copy; 2020.</h5>
            </div>
        </div>
    );
}

export default Footer;