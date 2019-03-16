import React, { Component } from 'react'

import './Personas.css'

class Personas extends Component{
    constructor(props){
        super(props);

        this.state = {
            subComponents: {
                nuevo: false,
                nuevaTripulacion: false,
                consultar: false
            }
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);

    }

    toggleSubComponent(component){
        var subComponentsCopy = this.state.subComponents;
        Object.keys(this.state.subComponents).forEach(keyName => {
            if(keyName === component){
                subComponentsCopy[keyName] = true;
            }
            else{
                subComponentsCopy[keyName] = false;
            }
            
        });
        this.setState({subComponents: subComponentsCopy});
    }

    render(){

        return(
            <div className="container">
                <div className="sub-component-buttons">
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevo')}><span>Nuevo empleado</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevaTripulacion')}><span>Nueva tripulacion</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar personas</span></div>
                </div>

                <div className={this.state.subComponents.nuevo ? 'active sub-component' : 'inactive sub-component'} id="nuevo-empleado-container">
                    <h2>Nuevo empleado</h2>
                    <table className="normal-table">
                        <tbody>
                            <tr>
                                <td>ID (cédula, DNI, pasaporte)</td>
                                <td><input type="text" className="normal-input"></input></td>
                            </tr>
                            <tr>
                                <td>Nombre</td>
                                <td><input type="text" className="normal-input"></input></td>
                            </tr>
                            <tr>
                                <td>Fecha de nacimiento</td>
                                <td><input type="text" className="normal-input" placeholder="deberia ser date"></input></td>
                            </tr>
                            <tr>
                                <td>Sexo</td>
                                <td>
                                    <select>
                                        <option>M</option>
                                        <option>F</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="normal-button middle-button">Ingresar empleado</button>
                </div>

                <div className={this.state.subComponents.nuevaTripulacion ? 'active sub-component' : 'inactive sub-component'} id="nueva-tripulacion-container">
                    <h2>Nueva tripulación</h2>
                    <table className="normal-table">
                        <tbody>
                            <tr>
                                <td>Vuelo</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Piloto 1</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Piloto 2</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 1</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 2</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 3</td>
                                <td>
                                    <select>
                                        <option>lol</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component' : 'inactive sub-component'} id="nuevo-empleado-container">
                    <h2>Consultar personas</h2>
                    <table className="normal-table">
                        <tbody>
                            <tr>
                                <td>Consultar: </td>
                                <td>
                                    <select>
                                        <option>todos</option>
                                        <option>vuelo XXX123</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="normal-button">Buscar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="normal-table">
                        <thead>
                            <th>ID</th>
                            <th>Nombre</th>
                        </thead>
                        <tbody>
                            <tr></tr>
                            <tr></tr>
                        </tbody>
                    </table>
                </div>

            </div>    
        );
    }
}

export default Personas;