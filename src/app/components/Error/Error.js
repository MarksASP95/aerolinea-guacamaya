import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Navigation from '../Navigation'

import './Error.css'

class Error extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <div className="error-container">
                <h2>La página que estás buscando no existe</h2>
            </div>
        );
    }
}

export default Error;