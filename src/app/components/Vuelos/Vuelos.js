import React, { Component } from 'react'
import './Vuelos.css'

class Vuelos extends Component{
    constructor(props){
        super(props);

        this.state = {
            subComponents: {
                crear: false,
                consultar: false,
                reportes: false
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
                    <div className="normal-button" onClick={() => this.toggleSubComponent('crear')}><span>Crear vuelo</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar vuelos</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reportes')}><span>Reportes</span></div>
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component table-container' : 'inactive sub-component table-container'}>
                    <h2>Consultar vuelos</h2>
                    <form onSubmit={this.handleConsultarSubmit}>
                        <table>
                            <tr>
                                <td>
                                    <span>Origen</span>
                                    <select>
                                        <option selected>Cualquiera</option>
                                    </select>
                                </td>
                                <td>
                                    <span>Destino</span>
                                    <select>
                                        <option selected value="">Cualquiera</option>
                                    </select>
                                </td>
                                <td>
                                    <span>Fecha desde:</span>
                                    
                                </td>
                                <td><button className="normal-button" type="submit">Consultar</button></td>
                            </tr>
                            
                        </table>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Núm. Vuelo</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.crear ? 'active sub-component' : 'inactive sub-component'} id="crear-vuelo-container">
                    <h2>Crear Vuelo</h2>
                    <form id="crear" onSubmit={this.handleCrearSubmit}>
                        <div class="dato-vuelo">
                            <span>Origen</span>
                            <select required>
                                <option>placeholder</option>
                            </select>
                        </div>
                        <div class="dato-vuelo">
                            <span>Destino</span>
                            <select required>
                                <option>placeholder</option>
                            </select>
                        </div>
                        <div class="dato-vuelo">
                            <span>Avion</span>
                            <select required>
                                <option>placeholder</option>
                            </select>
                        </div>
                        <div class="dato-vuelo">
                            <span>Fecha</span>
                            
                        </div>
                        <button className="normal-button" type="submit">Crear vuelo</button>
                    </form>
                </div> 

                <div className={this.state.subComponents.reportes ? 'active sub-component table-container' : 'inactive sub-component table-container'} id="reportes-vuelo-container">
                    <h2>Reportes</h2>
                    <h3>Sobreabordo</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Núm. Vuelo</th>
                                <th>Capacidad</th>
                                <th>Boletos otorgados</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Ciudades más visitadas</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Ciudad</th>
                                <th>Visitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default Vuelos;