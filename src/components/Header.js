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
                        src="/images/sslogosmall.png"
                        width="23.666"
                        height="20"
                        className="d-inline-block align-top mt-1 mr-2"
                    />
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
                        <NavItem>
                            <NavLink tag={Link} to="/addresses" replace>Addresses</NavLink>
                        </NavItem>
                    </Nav>
                    <Button onClick={() => authContext.logOut()}>Log out</Button>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;