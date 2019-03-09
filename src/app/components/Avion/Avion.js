import React, { Component } from 'react'

import './Avion.css'

class Avion extends Component{
    constructor(props){
        super(props);

        this.state = {
            subComponents: {
                nuevo: false,
                consultar: false,
                rutas: false,
                reportes: false
            }
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.handleSubmitRuta = this.handleSubmitRuta.bind(this);
        this.handleConsultarSubmit = this.handleConsultarSubmit.bind(this);
        this.handleSubmitNuevo = this.handleSubmitNuevo.bind(this);
    }

    handleSubmitRuta(){

    }

    handleConsultarSubmit(){

    }

    handleSubmitNuevo(accion){

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
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevo')}><span>Nuevo avión</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar aviones</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('rutas')}><span>Rutas</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reportes')}><span>Reportes</span></div>
                </div>

                <div className={this.state.subComponents.nuevo ? 'active sub-component' : 'inactive sub-component'} id="nuevo-avion-container">
                    <div id="selects">
                        <span>Modelo</span>
                        <select>
                            <option>placeholder</option>
                        </select>
                        <span>Proveedor</span>
                        <select>
                            <option>placeholder</option>
                        </select>
                    </div>

                    <div id="ficha">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Fabricante:</td>
                                    <td>FlyNibba</td>
                                </tr>
                                <tr>
                                    <td>Velocidad máxima:</td>
                                    <td>900 km/h</td>
                                </tr>
                                <tr>
                                    <td>Velocidad crucero:</td>
                                    <td>800 km/h</td>
                                </tr>
                                <tr>
                                    <td>Peso:</td>
                                    <td>43.000 kg</td>
                                </tr>
                                <tr>
                                    <td>Internet:</td>
                                    <td>Sí</td>
                                </tr>
                                <tr>
                                    <td>TV:</td>
                                    <td>Sí</td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="confirm-buttons">
                            <div className="normal-button" onClick={() => this.handleSubmitNuevo('comprar')}>Comprar</div>
                            <div className="normal-button" onClick={() => this.handleSubmitNuevo('alquilar')}>Alquilar</div>
                        </div>
                    </div>

                    
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component table-container' : 'inactive sub-component table-container'}>
                    <h2>Consultar aviones</h2>
                    <form onSubmit={this.handleConsultarSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>Fabricante</span>
                                        <select>
                                            <option defaultChecked>Cualquiera</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span>Modelo</span>
                                        <select>
                                            <option defaultChecked value="">Cualquiera</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span>Estado</span>
                                        <select>
                                            <option defaultChecked value="">Cualquiera</option>
                                        </select>
                                    </td>
                                    <td><button className="normal-button" type="submit">Consultar</button></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </form> 
                    <table>
                        <thead>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Fabricante</th>
                            <th>Distancia desp.</th>
                            <th>Distancia ate.</th>
                            <th>Estado</th>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.rutas ? 'active sub-component' : 'inactive sub-component'} id="rutas-avion-container">
                    <form>
                        <h2>
                            Avión
                            <span> N500 [2]</span>
                        </h2>
                        <select className="normal-select">
                            <option defaultChecked>N500 [2]</option>
                        </select>
                        <h2>
                            Rutas de
                            <span> N500 [2]</span>
                        </h2>
                        <table className="normal-table">
                            <thead>
                                <th>Origen</th>
                                <th>Destino</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CCS</td>
                                    <td>JFK</td>
                                </tr>
                                <tr>
                                    <td>JFK</td>
                                    <td>DBX</td>
                                </tr>
                                <tr>
                                    <td>MIA</td>
                                    <td>JFK</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Agregar ruta a este avión</h2>
                        <div id="nueva-ruta-container">
                            <select className="normal-select" required>
                                <option>CCS</option>
                            </select>
                            <span>a</span>
                            <select className="normal-select" required>
                                <option>MIA</option>
                            </select>
                        </div>
                    </form>
                    <div id="submit-nuevo" onClick={this.handleSubmitRuta}>Agregar</div>
                </div>

                <div className={this.state.subComponents.reportes ? 'active sub-component table-container' : 'inactive sub-component table-container'} id="reportes-avion-container">
                    <div id="select-avion-reporte">
                        <h2>
                            Avión
                            <span> N500 [2]</span>
                        </h2>
                        <select className="normal-select">
                            <option defaultChecked>N500 [2]</option>
                        </select>
                    </div>
                    
                    <div id="avion-reporte">
                        <h2>Reporte General</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Avión más usado:</td>
                                    <td>N300</td>
                                </tr>
                                <tr>
                                    <td>Avión con más vuelos por hacer:</td>
                                    <td>N34</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Vuelos realizados (3)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Núm. Vuelo</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>XXX123</td>
                                    <td>12/10/2018</td>
                                </tr>
                                <tr>
                                    <td>YYY456</td>
                                    <td>09/12/2019</td>
                                </tr>
                                <tr>
                                    <td>ZZZ789</td>
                                    <td>10/02/2019</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Vuelos por hacer (3)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Núm. Vuelo</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>XXX123</td>
                                    <td>12/10/2018</td>
                                </tr>
                                <tr>
                                    <td>YYY456</td>
                                    <td>09/12/2019</td>
                                </tr>
                                <tr>
                                    <td>ZZZ789</td>
                                    <td>10/02/2019</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>Estado: <span>EN ESPERA</span></h2>
                        
                    </div>


                </div>

            </div>
        );
    }
}

export default Avion;