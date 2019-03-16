import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import About from './components/About'
import Navigation from './components/Navigation'
import Error from './components/Error/Error'
import Vuelos from './components/Vuelos/Vuelos'
import Avion from './components/Avion/Avion'
import Banner from './components/Banner/Banner'
import Reservas from './components/Reservas/Reservas'
import Personas from './components/Personas/Personas'
import Cargando from './components/Cargando/Cargando'


class App extends Component {
    render(){
        return(
            <React.Fragment>
                <Cargando />
                <BrowserRouter>
                    <div>
                        <Banner />
                        <Switch>
                            <Route exact path="/" />
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/vuelos" component={Vuelos} />
                            <Route path="/aviones" component={Avion} />
                            <Route path="/reservas" component={Reservas} />
                            <Route path="/personas" component={Personas} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
            
        )
    }
}

export default App;