"use strict"

import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="list-inline">
                        <li className="list-inline-item"> 
                            <Link to="/" className="navbar-brand">
                                <img width="60px" height="90px" src="images/handicon.png" />
                            </Link>
                        </li>
                        <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                        <li className="list-inline-item"><Link to="/books" replace>Books</Link></li>
                        <li className="list-inline-item"><Link to="/Application" replace>Application</Link></li>
                    </ul>
                </div>
            </nav>
        );
}

export default Header;