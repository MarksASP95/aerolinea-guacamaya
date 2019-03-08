import React, { Component } from 'react'
import './Home.css'
import HomeButton from './HomeButton'
import { NavLink } from 'react-router-dom'

class Home extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            
            <div className="home-button-container">
                <HomeButton where="vuelos" name="Vuelos" />
                <HomeButton where="aviones" name="Aviones" />
                <HomeButton where="reservas" name="Reservas" />
                <HomeButton where="personas" name="Personas" />
            </div>
        );
    }
}

export default Home;