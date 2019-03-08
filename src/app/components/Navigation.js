import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Link, Route, NavLink } from 'react-router-dom';
import Home from './Home/Home';
import About from './About';

class Navigation extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className="inactive">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        );
    }
}

export default Navigation;