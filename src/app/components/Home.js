import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Navigation from './Navigation';

class Home extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                
                <h1>From Home but now it's a route</h1>
            </React.Fragment>
        );
    }
}

export default Home;