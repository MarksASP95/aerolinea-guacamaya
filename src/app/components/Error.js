import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Navigation from './Navigation';

class Error extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                
                <h1>La pagina que estas buscando no existe</h1>
            </React.Fragment>
        );
    }
}

export default Error;