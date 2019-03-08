import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import About from './components/About'
import Navigation from './components/Navigation'
import Error from './components/Error'
import Vuelos from './components/Vuelos/Vuelos'
import Banner from './components/Banner/Banner'


class App extends Component {
    render(){
        return(
            <React.Fragment>
                <BrowserRouter>
                    <div>
                        <Banner />
                        <Switch>
                            <Route exact path="/" />
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/vuelos" component={Vuelos} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default App;