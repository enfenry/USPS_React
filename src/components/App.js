"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from './Header.js';
import Home from './Home.js';
import BookContainer from './BookContainer';
import Customer from './Customer.js';
import NewApp from './NewApp.js';
import Applications from './Applications.js';


export class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' component={BookContainer}/>
                    <Route path='/applications' component={Applications}/>
                    <Route path='/customer' component={Customer}/>
                    <Route path='/newapp' component={NewApp}/>


                </Switch>
            </div>
        );
    }
}