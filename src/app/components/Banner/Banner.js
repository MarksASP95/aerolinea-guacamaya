import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './Banner.css'

class Banner extends Component{

    render(){
        return(
            <div id="banner">
                <NavLink to="/home" id="banner-link">
                    <h1>Aerolíneas Guacamaya</h1>
                </NavLink>
                <hr />
            </div>
        );
    }
}

export default Banner;