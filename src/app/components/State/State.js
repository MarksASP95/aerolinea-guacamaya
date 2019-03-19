import React, { Component } from 'react'

import './State.css'

class State extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="state">
                {this.props.json}
            </div>
        );
    }
}

export default State;