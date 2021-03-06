import React, { Component } from 'react'

import State from '../State/State'

import './Reservas.css'


class Reservas extends Component{
    constructor(props){
        super(props);

        this.state = {
            subComponents: {
                nueva: false,
                otorgarBoleto: false,
                reintegros: false,
                reasignar: false,
                sobreventa: false,
                reportes: false
            },
            nuevaReserva: {
                pasajeros: [],
                escalas: []
            },
            cantEscalas: -1,
            escalas: [],
            listaVuelos: [],
            AerosPorId: {},
            pasajeros: [],
            cantPasajeros: -1
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.nuevaEscala =  this.nuevaEscala.bind(this);
        this.borrarEscala = this.borrarEscala.bind(this);
        this.nuevoPasajero = this.nuevoPasajero.bind(this);
        this.borrarPasajero = this.borrarPasajero.bind(this);

        let listaVuelos;
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

    componentDidMount(){

        document.getElementById('loading-component').style.visibility = 'visible';


        let cargarAeropuertos = new Promise((resolve, reject) => {
            fetch('aeropuerto/porciudad')
                .then(res => {
                    res.json()
                        .then(aeropuertos => {
                            resolve('Aeropuertos listos');
                            this.setState({AerosPorId: aeropuertos});
                        })
                        .catch(err => {
                            reject('Error al cargar aeropuertos');
                        })
                })
        })


        cargarAeropuertos
        .then(any => {

            fetch('vuelo')
                .then(res => {
                    res.json()
                        .then(vuelos => {
                            this.setState({listaVuelos: vuelos});
                            var value;
                            this.listaVuelos  = this.state.listaVuelos.map(vuelo => {
                                //value = `{'id_vuelo':${vuelo.id_vuelo}, 'origen':${}}, 'destino':${this.state.AerosPorId[vuelo.destino][0].nom_ciudad}`;
                                return(
                                    <option data-origen={this.state.AerosPorId[vuelo.origen][0].nom_ciudad}
                                            data-destino={this.state.AerosPorId[vuelo.destino][0].nom_ciudad}
                                            value={vuelo.id_vuelo}>{vuelo.id_vuelo} => [{vuelo.origen}] - [{vuelo.destino}]</option>
                                );
                            })
                        })
                        .catch(err => {
                            //reject('Error al cargar vuelos');
                        })
                })
                    
            console.log('Selects listos!');
            let changeEvent = document.createEvent('Event');
            changeEvent.initEvent('change', true, false);
            let selects = document.getElementsByTagName('select');

            for(let el of selects){
                el.dispatchEvent(changeEvent);
            }

            document.getElementById('loading-component').style.visibility = 'hidden';
            })
            .catch(err => {
                
                console.log(err, '. Se actualizará la página');
            })
    }

    setOrigenDestino(e, cantEscalas){
        console.log(cantEscalas);
        let select = document.getElementsByName(e.target.name)[0];
        
        let origen = select.options[select.selectedIndex].getAttribute('data-origen');
        let destino = select.options[select.selectedIndex].getAttribute('data-destino');
        document.getElementsByClassName(`origen${e.target.name.charAt(e.target.name.length - 1)}`)[0].innerHTML = 'Origen: ' + origen;
        document.getElementsByClassName(`destino${e.target.name.charAt(e.target.name.length - 1)}`)[0].innerHTML = ' Destino: ' + destino;
    }

    componentDidUpdate(){
        let changeEvent = document.createEvent('Event');
        changeEvent.initEvent('change', true, false);
        let selects = document.getElementsByTagName('select');

        for(let el of selects){
            el.dispatchEvent(changeEvent);
        }
    }

    nuevaEscala(){

        let nuevaEscala = (<tr className="add-escala">
                    <td>
                        <select name={`escala${this.state.cantEscalas + 1}`} onChange={(e) => this.setOrigenDestino(e, this.state.cantEscalas)}>
                            {this.listaVuelos}
                        </select>
                    </td>
                    <td>
                        <tr>
                            <p className={`origen${this.state.cantEscalas + 1}`}></p>
                        </tr>
                        <tr>
                            <p className={`destino${this.state.cantEscalas + 1}`}></p>
                        </tr>
                    </td>
                </tr>)

        let escalas = this.state.escalas;
        escalas.push(nuevaEscala);

        this.setState({cantEscalas: this.state.cantEscalas + 1, escalas: escalas});
    }

    borrarEscala(){
        let escalas = this.state.escalas;
        if(escalas.length > 0){
            let cantEscalas = this.state.cantEscalas - 1;
            escalas.splice(-1,1);
            this.setState({escalas: escalas, cantEscalas: cantEscalas});
        }
    }

    nuevoPasajero(){
        let nuevoPasajero = (<tr class="add-pasajero"><td>ID: <input type="text" class="normal-input" /></td></tr>)

        let pasajeros = this.state.pasajeros;
        pasajeros.push((nuevoPasajero));

        this.setState({cantPasajeros: this.state.cantPasajeros + 1, pasajeros: pasajeros})

    }

    borrarPasajero(){
        let pasajeros = this.state.pasajeros;
        if(pasajeros.length > 0){
            let cantPasajeros = this.state.cantPasajeros - 1;
            pasajeros.splice(-1,1);
            this.setState({pasajeros: pasajeros, cantPasajeros: cantPasajeros});
        }
    }

    render(){

        

        return(
            <div className="container">
               {/*  <State json={JSON.stringify(this.state, null, "\t")} /> */}
                <div className="sub-component-buttons">
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nueva')}><span>Nueva reserva</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('otorgarBoleto')}><span>Otorgar boleto</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reintegros')}><span>Reintegros</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reasignar')}><span>Reasignar pasajeros</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('sobreventa')}><span>Sobreventa</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reportes')}><span>Reportes</span></div>
                </div>

                <div className={this.state.subComponents.nueva ? 'active sub-component' : 'inactive sub-component'} id="nueva-reserva-container">
                    <h2>Nueva reserva</h2>

                    <table className="normal-table">
                        <tbody>
                            <tr>
                                <td>ID comprador</td>
                                <td><input type="text" className="normal-input"></input></td>
                                <td>check</td>
                                <td><button className="normal-button">Revisar</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Vuelo(s)</h3>
                    <table className="normal-table" id="lista-escala">
                        {this.state.escalas}
                    </table>
                    <button className="normal-button" onClick={this.nuevaEscala}>Añadir escala</button>
                    <button className="normal-button" onClick={this.borrarEscala}>Quitar escala</button>

                    <h3>Pasajeros</h3>
                    <table className="normal-table" id="lista-pasajero">
                        {this.state.pasajeros}
                    </table>
                    <button className="normal-button" onClick={this.nuevoPasajero}>Añadir pasajero</button>
                    <button className="normal-button" onClick={this.borrarPasajero}>Quitar pasajero</button>

                    <h3>Costo: $2000</h3>
                    <button className="normal-button middle-button">Crear reserva</button>
                </div>

                <div className={this.state.subComponents.otorgarBoleto ? 'active sub-component' : 'inactive sub-component'} id="otorgar-boleto-container">
                    <h2>Otorgar boleto</h2>
                    <form>
                        <table className="normal-table">
                            <tbody>
                                <tr>
                                    <td>Núm. reserva</td>
                                    <td><input type="text" className="simple-input"></input></td>
                                </tr>
                                <tr>
                                    <td>ID pasajero</td>
                                    <td><input type="text" className="simple-input"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="normal-button middle-button">Otorgar boleto</button>
                    </form>
                </div>

                <div className={this.state.subComponents.reintegros ? 'active sub-component' : 'inactive sub-component'} id="reintegros-container">
                    <h2>Reintegros</h2>
                    <table className="normal-table">
                        <tr>
                            <td>ID comprador</td>
                            <td><input type="text" className="normal-input"></input></td>
                        </tr>
                        <tr>
                            <td>Núm. de reserva</td>
                            <td><input type="text" className="normal-input"></input></td>
                        </tr>
                    </table>

                    <div id="vuelos-con-reintegro">
                        <h3>Los siguientes vuelos tienen reintegro para esta reserva</h3>
                        <table className="normal-table">
                            <thead>
                                <th>Núm. vuelo</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Cancelado/Escala</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>XXX123</td>
                                    <td>CCS</td>
                                    <td>MIA</td>
                                    <td>Cancelado</td>
                                </tr>
                                <tr>
                                    <td>XXX456</td>
                                    <td>MIA</td>
                                    <td>MAD</td>
                                    <td>Escala</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>De la lista, reintegrar: 
                        <select>
                            <option>solo cancelados</option>
                            <option>todos</option>
                        </select>
                    </p>

                    <button className="normal-button middle-button">Reintegrar</button>
                </div>

                <div className={this.state.subComponents.reasignar ? 'active sub-component' : 'inactive sub-component'} id="reasignar-container">
                    <h2>Reasignar pasajeros</h2>
                    <table className="normal-table">
                        <tbody>
                            <tr>
                                <td>ID pasajero: </td>
                                <td><input type="text" className="normal-input"></input></td>
                            </tr>
                            <tr>
                                <td>por vuelo: </td>
                                <td>
                                    <select>
                                        <option defaultChecked>desviado</option>
                                        <option>cancelado</option>
                                        <option>sobrevendido</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="normal-button middle-button">Buscar</button>

                    <h3>Vuelos disponibles a CCS</h3>
                    <table className="normal-table">
                        <thead>
                            <th>Núm. vuelo</th>
                            <th>Fecha</th>
                            <th>Asignar</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XXX123</td>
                                <td>12/04/2019</td>
                                <td>(radio button)</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="normal-button middle-button">Aceptar</button>
                </div>

                <div className={this.state.subComponents.sobreventa ? 'active sub-component' : 'inactive sub-component'} id="sobreventa-container">
                    <h2>Sobreventa</h2>
                    <table className="normal-table">
                        <thead>
                            <th>Núm. vuelo</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Capacidad</th>
                            <th>Vendidos</th>
                            <th>Diferencia</th>
                        </thead>
                        <tbody>
                            <td>XXX123</td>
                            <td>CCS</td>
                            <td>JFK</td>
                            <td>80</td>
                            <td>73</td>
                            <td>7</td>
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.reportes ? 'active sub-component' : 'inactive sub-component'}>
                    <h2>Reportes</h2>
                    <h2>Demográfica de ventas</h2>

                    <h3>Compradores</h3>
                    <ul>
                        <li>Hombres: 64%</li>
                        <li>Mujeres: 36%</li>
                        <li>Edades: 18 - 75</li>
                    </ul>

                    <h3>Pasajeros</h3>
                    <ul>
                        <li>Hombres: 64%</li>
                        <li>Mujeres: 36%</li>
                        <li>Edades: 18 - 75</li>
                    </ul>

                    <h2>Destino más visitado: Dubai</h2>
                    <h2>Destino menos visitado: Caracas</h2>
                </div>

            </div>
        );
    }
}

export default Reservas;