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
            },
            nueva:{
                nuevaId: '',
                nuevaNombre: '',
                nuevaFecha: '',
                nuevaSexo: ''
            },
            consultarA: '',
            personas: [],
            listaVuelos: [],
            listaPilotos: [],
            listaAzafatas: []
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.submitNuevaPersona = this.submitNuevaPersona.bind(this);
        this.handleNuevoChange = this.handleNuevoChange.bind(this);
        this.handleConsultarPersona = this.handleConsultarPersona.bind(this);
        this.handleConsultarChange = this.handleConsultarChange.bind(this);

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

    handleConsultarPersona(e){
        e.preventDefault();

        fetch(`persona/${this.state.consultarA}`)
            .then(res => {
                res.json()
                    .then(personas => {
                        this.setState({personas: personas});
                    })
            })
    }

    handleConsultarChange(e){
        this.setState({
            consultarA: e.target.value,
            personas: []});
    }

    handleNuevoChange(e){
        console.log(e.target.value);
    }

    submitNuevaPersona(e){
        e.preventDefault();
    }

    componentDidMount(){

        document.getElementById('loading-component').style.visibility = 'visible';

        let cargarVuelos = new Promise((resolve, reject) => {
            fetch('vuelo')
                .then(res => {
                    res.json()
                        .then(vuelos => {
                            resolve('Vuelos listos');
                            this.setState({listaVuelos: vuelos});
                        })
                        .catch(err => {
                            reject('Error al cargar vuelos');
                        })
                })
        })

        let cargarPilotos = new Promise((resolve, reject) => {
            fetch('persona/pilotos')
                .then(res => {
                    res.json()
                        .then(pilotos => {
                            resolve('Pilotos listos');
                            this.setState({listaPilotos: pilotos});
                        })
                        .catch(err => {
                            reject('Error al cargar pilotos');
                        })
                })
        })

        let cargarAzafatas = new Promise((resolve, reject) => {
            fetch('persona/azafatas')
                .then(res => {
                    res.json()
                        .then(azafatas => {
                            resolve('Azafatas listas');
                            this.setState({listaAzafatas: azafatas});
                        })
                        .catch(err => {
                            reject('Error al cargar azafatas');
                        })
                })
        })
        
        Promise.all([cargarVuelos, cargarPilotos, cargarAzafatas])
            .then(msg => {
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

    render(){

        let personas = this.state.personas.map(persona => {
            return(
                <tr>
                    <td>{persona.id_persona}</td>
                    <td>{persona.nom_persona}</td>
                </tr>
            );
        })

        let listaVuelos = this.state.listaVuelos.map(vuelo => {
            return(
                <option value={vuelo.id_vuelo}>{vuelo.id_vuelo} => [{vuelo.origen}] - [{vuelo.destino}]</option>
            );
        })

        let listaPilotos = this.state.listaPilotos.map(piloto => {
            return(
                <option value={piloto.id_emp}>{piloto.nom_persona} - [{piloto.id_emp}]</option>
            );
        })

        let listaAzafatas = this.state.listaAzafatas.map(azafata => {
            return(
                <option value={azafata.id_emp}>{azafata.nom_persona} - [{azafata.id_emp}]</option>
            );
        })

        return(
            <div className="container">
                <div className="sub-component-buttons">
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevo')}><span>Nuevo empleado</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevaTripulacion')}><span>Nueva tripulacion</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar personas</span></div>
                </div>

                <div className={this.state.subComponents.nuevo ? 'active sub-component' : 'inactive sub-component'} id="nuevo-empleado-container">
                    <h2>Nuevo empleado</h2>
                    <form onSubmit={(e) => this.submitNuevaPersona(e)}>
                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <td>ID (cédula, DNI, pasaporte)</td>
                                    <td><input onChange={this.handleNuevoChange} name="nuevaId" type="text" className="normal-input"></input></td>
                                </tr>
                                <tr>
                                    <td>Nombre</td>
                                    <td><input onChange={this.handleNuevoChange} name="nuevaNombre" type="text" className="normal-input"></input></td>
                                </tr>
                                <tr>
                                    <td>Fecha de nacimiento</td>
                                    <td><input onChange={this.handleNuevoChange} name="nuevaFecha" type="date" className="normal-input"></input></td>
                                </tr>
                                <tr>
                                    <td>Sexo</td>
                                    <td>
                                        <select onChange={this.handleNuevoChange} name="nuevaSexo">
                                            <option>M</option>
                                            <option>F</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="normal-button middle-button">Ingresar empleado</button>
                    </form>
                </div>

                <div className={this.state.subComponents.nuevaTripulacion ? 'active sub-component' : 'inactive sub-component'} id="nueva-tripulacion-container">
                    <h2>Nueva tripulación</h2>
                    <table className="form-table">
                        <tbody>
                            <tr>
                                <td>Vuelo</td>
                                <td>
                                    <select>
                                        {listaVuelos}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Piloto 1</td>
                                <td>
                                    <select>
                                        {listaPilotos}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Piloto 2</td>
                                <td>
                                    <select>
                                        {listaPilotos}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 1</td>
                                <td>
                                    <select>
                                        {listaAzafatas}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 2</td>
                                <td>
                                    <select>
                                        {listaAzafatas}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Azafata 3</td>
                                <td>
                                    <select>
                                        {listaAzafatas}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component' : 'inactive sub-component'} id="nuevo-empleado-container">
                    <h2>Consultar personas</h2>
                    <form onSubmit={this.handleConsultarPersona}>
                        <table className="normal-table">
                            <tbody>
                                <tr>
                                    <td>Consultar: </td>
                                    <td>
                                        <select name="consultarA" onChange={this.handleConsultarChange}>
                                            <option value="">Todos</option>
                                            <option value="empleados">Empledos</option>
                                            <option value="compradores">Compradores</option>
                                            <option value="pasajeros">Pasajeros</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="normal-button">Buscar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    

                    <table className="normal-table">
                        <thead>
                            <th>ID</th>
                            <th>Nombre</th>
                        </thead>
                        <tbody>
                            {personas}
                        </tbody>
                    </table>
                </div>

            </div>    
        );
    }
}

export default Personas;