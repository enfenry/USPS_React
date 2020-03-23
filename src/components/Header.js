"use strict"

import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';
import { authContext } from '../adalConfig.js';

const Header = () => {
    return (

        <div className="jumbotron">
            <div className="main">
                <img width="200px" height="30px" src="images/sslogo.png" />
                <h1 align="center"> USPS Dynamics Project</h1>
            </div>
            <ul className="list-inline">
                <h5 align="center">
                    <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                    <li className="list-inline-item"><Link to="/applications" replace>Applications</Link></li>
                    <li className="list-inline-item"><Link to="/customers" replace>Customers</Link></li>
                    <li className="list-inline-item"><Button color="primary" onClick={() => authContext.logOut()}>Log out</Button></li>
                </h5>
            </ul>
        </div>
    );
}

export default Header;