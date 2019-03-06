import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navigation from './components/Navigation';
import Error from './components/Error';


class App extends Component {
    render(){
        return(
            <React.Fragment>
                <BrowserRouter>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path="/" />
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        )
    }
}

export default App;