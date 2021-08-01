import React from 'react';
import './style.css';

import Logo from '../../assets/logo.png';

function Layout(props) {
    return (
        <div className="form-container">
            <img className="logo-layout" src={Logo} alt="logo Sunday.com" />
            <div className="container">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;