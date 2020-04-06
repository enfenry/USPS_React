"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './Header.js';
import Home from './Home.js';

import ApplicationsContainer from './ApplicationsContainer';
import CustomersContainer from './CustomersContainer';
import AddressesContainer from './AddressesContainer';
import OrdersContainer from './OrdersContainer';

import DynamicModal from './modals/DynamicModal';

export class App extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Header />
                <DynamicModal name="dynamic"/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/applications' component={ApplicationsContainer}/>
                    <Route path='/customers' component={CustomersContainer}/>
                    <Route path='/addresses' component={AddressesContainer}/>
                    <Route path='/orders' component={OrdersContainer}/>
                </Switch>
            </React.Fragment>
        );
    }
}