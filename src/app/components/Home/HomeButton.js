import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './HomeButton.css'


class HomeButton extends Component{

    constructor(props){
        super(props);
    }

    clickLink(){
        //document.getElementBy
    }

    render(){
        return(
            <div className="home-button">
                <NavLink className="home-button-name" to={"/" + this.props.where}>
                <p>{this.props.name}</p>
                </NavLink>
                
            </div>
        );
    }
}

export default HomeButton;