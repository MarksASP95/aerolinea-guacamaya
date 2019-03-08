import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class HomeButton extends Component{


    render(){
        return(
            <div className="home-button">
                <NavLink className="home-button-name" to={"/" + this.props.where}>{this.props.name}</NavLink>
            </div>
        );
    }
}

export default HomeButton;