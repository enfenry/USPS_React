"use strict"

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <div className="jumbotron">
        <div className="main">
            <h1>
                <img width="200px" height="30px" src="images/sslogo.png" />
            </h1>
            <h1 align="center"> USPS Dynamics Project
            </h1>
            </div>
            <div className="tabs"></div>
            <nav>
                <ul className="list-inline">
                    <h5 align="center">
                        <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                        <li className="list-inline-item"><Link to="/books" replace>Books</Link></li>
                        <li className="list-inline-item"><Link to="/Application" replace>Completed Applications</Link></li>
                        <li className="list-inline-item"><Link to="/customer" replace>Customers</Link></li>
                        <li className="list-inline-item"><Link to="/newapp" replace>New Application</Link></li>

                    </h5>
                </ul>
            </nav>

        </div>

    );
}

export default Header;