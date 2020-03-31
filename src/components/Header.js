"use strict"

import React, { useState } from 'react';
import { authContext } from '../adalConfig.js';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    <img
                        alt=""
                        src="/sslogosmall.png"
                        width="35.5"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    USPS Dynamics Project
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/" replace>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/applications" replace>Applications</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/customers" replace>Customers</NavLink>
                        </NavItem>
                    </Nav>
                    <Button onClick={() => authContext.logOut()}>Log out</Button>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;