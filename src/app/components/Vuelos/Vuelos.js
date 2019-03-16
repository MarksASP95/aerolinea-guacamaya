import React, { Component } from 'react'

import { groupBy } from 'lodash'

import './Vuelos.css'

class Vuelos extends Component{
    constructor(props){
        super(props);

        this.state = {
            subComponents: {
                crear: false,
                consultar: false,
                reportes: false
            },
            aeropuertos: [],
            aviones: [],
            fecha: '',
            consultar: {
                consultarOrigen: '_',
                consultarDestino: '_',
                consultarFecha: ''
            },
            tablaConsultarVuelos: [],
            reportes: {
                sobreabordo: [],
                masVisitados: []
            },
            crear: {
                origen: '',
                destino: '',
                avion: '',
                fecha: ''
            }
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.handleConsultarSubmit = this.handleConsultarSubmit.bind(this);
        this.handleConsultarChange =  this.handleConsultarChange.bind(this);
        this.handleCrearSubmit = this.handleCrearSubmit.bind(this);

    }

    handleCrearChange(e){
        let crearCopy = this.state.crear;
        crearCopy[e.target.name] = e.target.value;
        console.log(crearCopy);
        this.setState({crear: crearCopy});
    }

    handleCrearSubmit(e){
        e.preventDefault();

        
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



        let cargarAviones = new Promise((resolve, reject) => {
            fetch('avion')
                .then(response => {
                    response.json()
                        .then(aviones => {
                            resolve('Aviones listos');
                            this.setState({aviones: aviones});
                        })  
                        .catch(err => {
                            reject('No se pudo cargar aviones');
                        })
                })
        })

        let cargarCiudades = new Promise((resolve, reject) => {
            fetch('aeropuerto')
                .then(response => {
                    response.json()
                        .then(aeropuertos => {
                            this.setState({aeropuertos: aeropuertos});
                            resolve('Ciudades listas');
                        })
                        .catch(err => {
                            reject('No se pudo cargar ciudades');
                        })
                })
        })

        Promise.all([cargarAviones, cargarCiudades])
            .then(msgs => {
                let changeEvent = document.createEvent('Event');
                changeEvent.initEvent('change', true, false);
                let selects = document.getElementsByTagName('select');
        
                for(let el of selects){
                    el.dispatchEvent(changeEvent);
                }
                console.log('Selects listos!')
                document.getElementById('loading-component').style.visibility = 'hidden';
            })
            .catch(err => {
                console.log(err + '. Se actualizará la página'); // muestra el error en cuestion
                location.reload();
            })

        fetch('vuelo/reportes/sobreabordo')
            .then(response => {
                response.json()
                    .then(
                        rows => {
                            let reportesCopy = this.state.reportes;
                            reportesCopy.sobreabordo = rows;
                            this.setState({reportes: reportesCopy});
                        }
                    )
            })

        fetch('aeropuerto/masVisitados')
        .then(response => {
            response.json()
                .then(rows => {
                    let reportesCopy = this.state.reportes;
                    reportesCopy.masVisitados = rows;
                    this.setState({reportes: reportesCopy});
                })
        })
        
    }

    handleConsultarChange(e){

        let consultarCopy = this.state.consultar;
        
        consultarCopy[e.target.name] = e.target.value;
        this.setState({consultar: consultarCopy});
    }

    handleConsultarSubmit(e){
        e.preventDefault();

        let origen = this.state.consultar.consultarOrigen;
        let destino = this.state.consultar.consultarDestino;
        let fecha = this.state.consultar.consultarFecha;

        fecha === '' ? fecha = '1900-01-02' : fecha;
        
/*         let fechaYesterday = new Date(fecha);
        fechaYesterday.setDate(fechaYesterday.getDate()-1);
        fecha = fechaYesterday; */

        fetch(`vuelo/${origen}/${destino}/${fecha}`)
            .then(response => {
                response.json()
                    .then(vuelos => {
                        this.setState({tablaConsultarVuelos: vuelos});
                    })
            })

        

    }

    render(){

        

        let aviones = this.state.aviones.map(row => {
            return(
                <option value={row.id_avi}>{row.fabricante} {row.modelo} [{row.id_avi}]</option>
            );
        });

        let aeropuertos = this.state.aeropuertos.map(row => {
            return(
                <option value={row.id_aer}>{row.nom_ciudad} [{row.id_aer}]</option>
            );
        });

        let vuelos = this.state.tablaConsultarVuelos.map(row => {
            return(
                <tr>
                    <td>{row.id_vuelo}</td>
                    <td>{row.origen}</td>
                    <td>{row.destino}</td>
                    <td>{row.fecha}</td>
                </tr>
            );
        });

        let sobreabordo = this.state.reportes.sobreabordo.map(row => {
            return(
                <tr>
                    <td>{row.id_vuelo}</td>
                    <td>{row.capacidad}</td>
                    <td>{row.boletosOtorgados}</td>
                    <td>{row.diferencia <= row.capacidad ? 'Normal' : '¡Sobreabordado!'}</td>
                </tr>
            );
        });

        let masVisitados = this.state.reportes.masVisitados.map(row => {
            return(
                <tr>
                    <td>{row.nom_ciudad}</td>
                    <td>{row.cantidadDeVuelosA}</td>
                </tr>
            );
        });

        let date = new Date();
        let tomorrow = new Date(date);
        tomorrow.setDate(date.getDate()+1)
        let currentYear = tomorrow.getFullYear();
        let currentMonth = tomorrow.getMonth() + 1 < 10 ? '0' + (tomorrow.getMonth()+1).toString() : tomorrow.getMonth() + 1;
        let currentDate =  tomorrow.getDate();
        let today =  currentYear + '-' +  currentMonth + '-' + currentDate;
        
        return(
            <div className="container">
                <div className="sub-component-buttons">
                    <div className="normal-button" onClick={() => this.toggleSubComponent('crear')}><span>Crear vuelo</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar vuelos</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reportes')}><span>Reportes</span></div>
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component table-container' : 'inactive sub-component table-container'}>
                    <h2>Consultar vuelos</h2>
                    <form onSubmit={this.handleConsultarSubmit} onChange={this.handleConsultarChange}>
                        <table>
                            <tr>
                                <td>
                                    <span>Origen</span>
                                    <select name="consultarOrigen">
                                        <option value="_">Cualquiera</option>
                                        {aeropuertos}
                                    </select>
                                </td>
                                <td>
                                    <span>Destino</span>
                                    <select name="consultarDestino">
                                        <option value="_">Cualquiera</option>
                                        {aeropuertos}
                                    </select>
                                </td>
                                <td>
                                    <span>Fecha desde:</span>
                                    <input type="date" id="date-vuelo" name="consultarFecha"></input>
                                </td>
                                <td><button className="normal-button" type="submit">Consultar</button></td>
                            </tr>
                            
                        </table>
                    </form>
                    <table className="normal-table">
                        <thead>
                            <th>Núm. Vuelo</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha</th>
                        </thead>
                        <tbody>
                            {vuelos}
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.crear ? 'active sub-component' : 'inactive sub-component'} id="crear-vuelo-container">
                    <h2>Crear Vuelo</h2>
                    <form id="crear" onSubmit={(e) => this.handleCrearSubmit(e)}>
                        <div className="dato-vuelo">
                            <span>Origen</span>
                            <select onChange={(e) => this.handleCrearChange(e)} name="origen" required>
                                {aeropuertos}
                            </select>
                        </div>
                        <div className="dato-vuelo">
                            <span>Destino</span>
                            <select onChange={(e) => this.handleCrearChange(e)} name="destino" required>
                                {aeropuertos}
                            </select>
                        </div>
                        <div className="dato-vuelo">
                            <span>Avion</span>
                            <span className="leyenda">*Fabricante Modelo [Placa]</span>
                            <select onChange={(e) => this.handleCrearChange(e)} name="avion" required>
                                {aviones}
                            </select>
                        </div>
                        <div className="dato-vuelo">
                            <span>Fecha</span>
                            <input onChange={(e) => this.handleCrearChange(e)} name="fecha" type="date" id="date" className="normal-input" min={today}></input>
                        </div>
                        <button className="normal-button" type="submit">Crear vuelo</button>
                    </form>
                </div> 

                <div className={this.state.subComponents.reportes ? 'active sub-component table-container' : 'inactive sub-component table-container'} id="reportes-vuelo-container">
                    <h2>Reportes</h2>
                    <h3>Sobreabordo</h3>
                    <table className="normal-table">
                        <thead>
                            <th>Núm. Vuelo</th>
                            <th>Capacidad</th>
                            <th>Boletos otorgados</th>
                            <th>Estado</th>
                        </thead>
                        <tbody>
                            {sobreabordo}
                        </tbody>
                    </table>

                    <h3>Ciudades más visitadas</h3>
                    <table className="normal-table">
                        <thead>
                            <th>Ciudad</th>
                            <th>Visitas</th>
                        </thead>
                        <tbody>
                            {masVisitados}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default Vuelos;