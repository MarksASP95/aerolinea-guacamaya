import React, { Component } from 'react'
import './Home.css'
import HomeButton from './HomeButton'

class Home extends Component {
    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        return(
            
            <div className="home-button-container">
                <HomeButton where="vuelos" name="Vuelos" id="home-button-vuelos" />
                <HomeButton where="aviones" name="Aviones" id="home-button-aviones" />
                <HomeButton where="reservas" name="Reservas" id="home-button-reservas" />
                <HomeButton where="personas" name="Personas" id="home-button-personas" />
            </div>
        );
    }
}

export default Home;