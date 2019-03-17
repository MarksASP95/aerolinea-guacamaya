import React, { Component } from 'react'

import { groupBy } from 'lodash'

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
            AerosPorId: {}
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.addObject = this.addObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.nuevaEscala =  this.nuevaEscala.bind(this);

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

    deleteObject(id){
        document.getElementById(id).deleteRow(-1);
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

    getContenidoEscala(){
        let vuelos = ['XXX123', 'XXX456', 'XXX789'];
        let select = document.createElement('SELECT');
        vuelos.forEach((vuelo) => {
            let option = document.createElement('OPTION');
            option.innerHTML = vuelo;
            select.appendChild(option);
        });
        // SELECT LISTO

        let firstTD = document.createElement('TD');
        let secondTD = document.createElement('TD');
        firstTD.appendChild(select);

        let origenTR = document.createElement('TR');
        let destinoTR = document.createElement('TR');

        let origenP = document.createElement('P');
        let destinoP = document.createElement('P');

        origenP.innerHTML = ' origen: ';
        destinoP.innerHTML = ' destino: ';

        origenTR.appendChild(origenP);
        destinoTR.appendChild(destinoP);

        secondTD.appendChild(origenTR);
        secondTD.appendChild(destinoTR);

        return [firstTD, secondTD];

    }

    getContenidoPasajero(){
        let td = document.createElement('TD');
        td.innerHTML = 'ID: ';
        
        let input = document.createElement('INPUT');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'normal-input');

        td.appendChild(input);
        
        return td;
    }

    addObject(objType){
        let newObj = document.getElementsByClassName(`add-${objType}`)[0];
        //console.log(newObj);
        let table = document.getElementById(`lista-${objType}`);
        let newRow = table.insertRow();
        newRow.setAttribute('class', `add-${objType}`)
        if(objType == 'pasajero'){
            newRow.appendChild(this.getContenidoPasajero());
        }
        else{
            let contenidoEscala = this.getContenidoEscala();
            newRow.appendChild(contenidoEscala[0]);
            newRow.appendChild(contenidoEscala[1]);
        }
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

        this.setState({cantEscalas: this.state.cantEscalas + 1,
                       escalas: escalas});
    }

    borrarEscala(){
        let escalas = document.getElementsByClassName('add-escala');
        let ultimaEscala = escalas[escalas.length - 1];

        ultimaEscala.parentNode.removeChild(ultimaEscala);
    }

    render(){

        let pasajero = (<td>ID: <input type="text" class="normal-input" /></td>);

        

        return(
            <div className="container">
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
                        <tr class="add-pasajero">
                            <td>
                                ID: <input type="text" className="normal-input"></input>
                            </td>
                        </tr>
                    </table>
                    <button className="normal-button" onClick={() => this.addObject('pasajero')}>Añadir pasajero</button>
                    <button className="normal-button" onClick={() => this.deleteObject('lista-pasajero')}>Quitar pasajero</button>

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