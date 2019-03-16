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
            },
            consultar: {
                fabricante: '',
                modelo: '',
                estado: '',
                resultados: []
            },
            modelos: [],
            proveedores: [],
            aeropuertos: [],
            aviones: [],
            avionesConRuta: [],
            infoModelo: {},
            selectedModelo: 0,
            selectedProveedor: 0,
            selectedAvion: '',
            rutasPorAvion: {},
            vuelosPorAvion: {},
            vuelosDeAvion: [],
            rutasDeAvion: [],
            nuevoOrigen: '',
            nuevoDestino: '',
            avionNuevaRuta: '',
            estadoAvionSel: ''
        }

        this.toggleSubComponent = this.toggleSubComponent.bind(this);
        this.handleSubmitRuta = this.handleSubmitRuta.bind(this);
        this.handleConsultarSubmit = this.handleConsultarSubmit.bind(this);
        this.handleSubmitNuevo = this.handleSubmitNuevo.bind(this);
        this.handleConsultarChange = this.handleConsultarChange.bind(this);
        this.updateModeloAndProveedor = this.updateModeloAndProveedor.bind(this);
        this.toggleSeleccionado = this.toggleSeleccionado.bind(this);
        this.updateRutasDeAvion = this.updateRutasDeAvion.bind(this);
        this.updateVuelosDeAvion = this.updateVuelosDeAvion.bind(this); 
    }

    handleSubmitRuta(e){
        e.preventDefault();

        let nuevoOrigenLista = document.getElementsByName('nuevo-origen')[0];
        let nuevoOrigen = nuevoOrigenLista.options[nuevoOrigenLista.selectedIndex].value;

        let nuevoDestinoLista = document.getElementsByName('nuevo-destino')[0];
        let nuevoDestino = nuevoDestinoLista.options[nuevoDestinoLista.selectedIndex].value;

        let listaAvionesConRuta = document.getElementsByName('lista')[0].options;
        let avion = listaAvionesConRuta[listaAvionesConRuta.selectedIndex].value;
        avion = parseInt(avion);

        let data = {
            "origen": nuevoOrigen,
            "destino": nuevoDestino,
            "id_avi": avion
        }

        console.log(nuevoOrigen, nuevoDestino, avion);

        if(nuevoDestino === nuevoOrigen){
            alert('El destino y el origen no pueden ser iguales');
        }
        else{
            fetch('ruta', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    res.json()
                        .then(status => {
                            if(status.name){
                                alert('Esta ruta ya existe');
                            }
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    handleConsultarSubmit(e){
        e.preventDefault();
        var rows;
        let fabricante = this.state.consultar.fabricante === '' ? '_' : this.state.consultar.fabricante;
        let modelo = this.state.consultar.modelo === '' ? '_' : this.state.consultar.modelo;
        let estado = this.state.consultar.estado === '' ? '_' : this.state.consultar.estado;

        fetch(`/avion/${fabricante}/${modelo}/${estado}`)
            .then(response => {
                response.json()
                .then(aviones => {
                    aviones;
                    let consultarCopy = this.state.consultar;
                    consultarCopy.resultados = aviones;
                    this.setState({consultar: consultarCopy});
                })
            });

        
    }

    handleSubmitNuevo(action){

        let data = {};
        let route;
        if(action === 'comprar'){
            let modelo = document.getElementsByName('select-modelo')[0].options[this.state.selectedModelo].value;
            route = 'avion';
            data = {
                'modelo': modelo,
            }    
        }
        else{
            route = 'avion/alquilado';
        }

        fetch(route, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {})
        .catch(status => {
            alert(status.name);
        })
        
        
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

    

    handleConsultarChange(e){
        let consultarCopy = this.state.consultar;
        consultarCopy[e.target.name] = e.target.value;
        this.setState({consultar: consultarCopy});
    }

    updateRutasDeAvion(){
        this.toggleSeleccionado(0);
        let lista = document.getElementsByName('lista')[0];
        let rutas = this.state.rutasPorAvion[lista.options[lista.selectedIndex].value];
        this.setState({rutasDeAvion: rutas});
    }

    updateVuelosDeAvion(){
        this.toggleSeleccionado(1);
        let lista = document.getElementsByName('lista-aviones-reporte')[0];
        let vuelos = this.state.vuelosPorAvion[lista.options[lista.selectedIndex].value];
        this.setState({vuelosDeAvion: vuelos, estadoAvionSel: this.state.vuelosPorAvion[lista.options[lista.selectedIndex].value][0]['avion.estado']});
    }

    componentDidMount(){

        document.getElementById('loading-component').style.visibility = 'visible';
    
        let cargarRutas = new Promise((resolve, reject) => {
            fetch('ruta')
                .then(response => {
                    response.json()
                        .then(rutasPorAvion => {
                            resolve('Rutas listas');
                            this.setState({rutasPorAvion: rutasPorAvion});
                        })
                        .catch(err => {
                            reject('Error al cargar rutas');
                        })
                })
        })

        let cargarAviones = new Promise((resolve, reject) => {
            fetch('avion/_/_/_')
                .then(response => {
                    response.json()
                        .then(aviones => {
                            this.setState({aviones: aviones});
                            resolve('Aviones listos');
                        })
                        .catch(err => {
                            reject('No se pudo cargar aviones');
                        })
                })
        })

        let cargarAvionesConRuta = new Promise((resolve, reject) => {
            fetch('ruta/aviones')
                .then(response => {
                    response.json()
                        .then(aviones => {
                            this.setState({avionesConRuta: aviones});
                            resolve('Aviones con ruta listos');
                        })
                        .catch(err => {
                            reject('No se pudo cargar aviones con ruta');
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

        let cargarModelos = new Promise((resolve, reject) => {
            fetch('avion/modelos')
            .then(response => {
                response.json()
                    .then(modelos => {
                        resolve('Modelos cargados');
                        this.setState({modelos: modelos});
                    })
                    .catch(err => {
                        reject('Error al cargar modelos');
                    })
                    
            })
        })

        let cargarProveedores = new Promise((resolve, reject) => {
            fetch('avion/proveedores')
            .then(response => {
                response.json()
                    .then(proveedores => {
                        resolve('Proveedores cargados');
                        this.setState({proveedores: proveedores});
                    })
                    .catch(err => {
                        reject('Error al cargar proveedores');
                    })
            })
        })


        Promise.all([cargarModelos, cargarProveedores, cargarCiudades, cargarAviones, cargarRutas, cargarAvionesConRuta])
            .then(msgs => {
                let changeEvent = document.createEvent('Event');
                changeEvent.initEvent('change', true, false);
                let selects = document.getElementsByTagName('select');
        
                for(let el of selects){
                    el.dispatchEvent(changeEvent);
                }
                document.getElementById('loading-component').style.visibility = 'hidden';
                console.log('Selects listos!');
            })
            .catch(err => {
                alert(err + '. Se actualizará la página');
                location.reload();
            })
            
        fetch('vuelo/poravion')
            .then(res => {
                res.json()
                    .then(vuelos => {
                        this.setState({vuelosPorAvion: vuelos})
                    })
            })
            .catch(err => {
                console.log('Error al cargar vuelos por avion');
            })
    }

    updateModeloAndProveedor(){
        let selectedModelo = document.getElementById('select-modelo').selectedIndex;
        let selectedProveedor = document.getElementById('select-proveedor').selectedIndex;

        this.setState({
            selectedModelo: selectedModelo,
            selectedProveedor: selectedProveedor
        })

    }

    toggleSeleccionado(i){
        let lista = document.getElementsByClassName('lista-aviones')[i];
        let seleccionado = lista.options[lista.options.selectedIndex].text;
        console.log(seleccionado);
        this.setState({selectedAvion: seleccionado});

    }

    render(){

        
        
        let vuelosDeAvion = this.state.vuelosDeAvion.map(vuelo => {
            return(
                <tr>
                    <td>{vuelo.id_vuelo}</td>
                    <td>{vuelo.fecha}</td>
                </tr>
            );
        })

        let avionesConVueloKeys = Object.keys(this.state.vuelosPorAvion);
        let avionConMasVuelos;
        let max = 0;
        let avionesConVuelo = avionesConVueloKeys.map(key => {
            if(this.state.vuelosPorAvion[key].length >= max){
                avionConMasVuelos = `${this.state.vuelosPorAvion[key][0]["avion.modelo_avion.fabricante"]} ${this.state.vuelosPorAvion[key][0]["avion.modelo"]} [${this.state.vuelosPorAvion[key][0].id_avi}]`;
            }
            return(
                <option value={this.state.vuelosPorAvion[key][0].id_avi}>{this.state.vuelosPorAvion[key][0]["avion.modelo_avion.fabricante"]} {this.state.vuelosPorAvion[key][0]["avion.modelo"]} [{this.state.vuelosPorAvion[key][0].id_avi}]</option>
            );
        });

        let rutasDeAvion = this.state.rutasDeAvion.map(ruta => {
            return(            
                <tr>
                    <td>{ruta.origen}</td>
                    <td>{ruta.destino}</td>
                </tr>
            );
        });

        let aeropuertos = this.state.aeropuertos.map(row => {
            return(
                <option value={row.id_aer}>{row.nom_ciudad} [{row.id_aer}]</option>
            );
        })


        let modelos = this.state.modelos.map(row => {
            return(
                <option value={row.modelo}>{row.fabricante} {row.modelo}</option>
            );
        })

        let proveedores = this.state.proveedores.map(row => {
            return(
                <option value={row.id_prov}>{row.nom_prov}</option>
            );
        })

        let tablaAviones = this.state.consultar.resultados.map(row => {
            return(
            <tr>
                <td>{row.id_avi}</td>
                <td>{row.modelo}</td>
                <td>{row.fabricante}</td>
                <td>{row.dist_des}</td>
                <td>{row.dist_ate}</td>
                <td>{row.estado}</td>
            </tr>);
        })

        let listaAviones = this.state.aviones.map(row => {
            return(
                <option value={row.id_avi}>{row.fabricante} {row.modelo} [{row.id_avi}]</option>
            );
        })

        let listaAvionesConRuta = this.state.avionesConRuta.map(row => {
            return(
                <option value={row.id_avi}>{row.fabricante} {row.modelo} [{row.id_avi}]</option>
            );
        })
        

        return(
            <div className="container">
                <div className="sub-component-buttons">
                    <div className="normal-button" onClick={() => this.toggleSubComponent('nuevo')}><span>Nuevo avión</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('consultar')}><span>Consultar aviones</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('rutas')}><span>Rutas</span></div>
                    <div className="normal-button" onClick={() => this.toggleSubComponent('reportes')}><span>Reportes</span></div>
                </div>

                <div className={this.state.subComponents.nuevo ? 'active sub-component' : 'inactive sub-component'} id="nuevo-avion-container">
                    <h2>Nuevo avión</h2>
                    <div id="selects">
                        <span>Modelo</span>
                        <select name="select-modelo" id="select-modelo" onChange={this.updateModeloAndProveedor}>
                            {modelos}
                        </select>
                        <span>Proveedor</span>
                        <select name="select-proveedor" id="select-proveedor" onChange={this.updateModeloAndProveedor}>
                            {proveedores}
                        </select>
                    </div>

                    <div id="ficha">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Fabricante:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? this.state.modelos[this.state.selectedModelo].fabricante : ''}</td>
                                </tr>
                                <tr>
                                    <td>Velocidad máxima:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? this.state.modelos[this.state.selectedModelo].vel_max : ''}</td>
                                </tr>
                                <tr>
                                    <td>Velocidad crucero:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? this.state.modelos[this.state.selectedModelo].vel_cru : ''}</td>
                                </tr>
                                <tr>
                                    <td>Peso:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? this.state.modelos[this.state.selectedModelo].peso_vac : ''}</td>
                                </tr>
                                <tr>
                                    <td>Internet:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? (this.state.modelos[this.state.selectedModelo].internet ? 'Sí' : 'No') : ''}</td>
                                </tr>
                                <tr>
                                    <td>TV:</td>
                                    <td>{this.state.modelos[this.state.selectedModelo] ? (this.state.modelos[this.state.selectedModelo].tv ? 'Sí' : 'No') : ''}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="confirm-buttons">
                            <button className="normal-button" onClick={() => this.handleSubmitNuevo('comprar')}>Comprar</button>
                            <button className="normal-button" onClick={() => this.handleSubmitNuevo('alquilar')}>Alquilar</button>
                        </div>
                    </div>

                    
                </div>

                <div className={this.state.subComponents.consultar ? 'active sub-component table-container' : 'inactive sub-component table-container'}>
                    <h2>Consultar aviones</h2>
                    <form onSubmit={this.handleConsultarSubmit} onChange={this.handleConsultarChange}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>Fabricante</span>
                                        <input type="text" className="normal-input" name="fabricante"></input>
                                    </td>
                                    <td>
                                        <span>Modelo</span>
                                        <input type="text" className="normal-input" name="modelo"></input>
                                    </td>
                                    <td>
                                        <span>Estado</span>
                                        <input type="text" className="normal-input" name="estado"></input>
                                    </td>
                                    <td><button className="normal-button" type="submit">Consultar</button></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </form> 
                    <table className="normal-table">
                        <thead>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Fabricante</th>
                            <th>Distancia desp.</th>
                            <th>Distancia ate.</th>
                            <th>Estado</th>
                        </thead>
                        <tbody>
                            {tablaAviones}
                        </tbody>
                    </table>
                </div>

                <div className={this.state.subComponents.rutas ? 'active sub-component' : 'inactive sub-component'} id="rutas-avion-container">
                    <form name="rutas-form" onSubmit={(e) => this.handleSubmitRuta(e)}>
                        <h2>Rutas</h2>
                        <h2>
                            Avión:
                            <span> {this.state.selectedAvion}</span>
                            <span className="leyenda">*Fabricante Modelo [Placa]</span>
                        </h2>
                        <select onChange={this.updateRutasDeAvion} className="normal-select lista-aviones" name="lista">
                            {listaAvionesConRuta}
                        </select>
                        <h2>
                            Rutas de
                            <span> {this.state.selectedAvion}</span>
                        </h2>
                        <table className="normal-table">
                            <thead>
                                <th>Origen</th>
                                <th>Destino</th>
                            </thead>
                            <tbody>
                               {rutasDeAvion}
                            </tbody>
                        </table>

                        <h2>Agregar ruta a este avión</h2>
                        <div id="nueva-ruta-container">
                            <select name="nuevo-origen" className="normal-select" required>
                                {aeropuertos}
                            </select>
                            <span>a</span>
                            <select name="nuevo-destino" className="normal-select" required>
                                {aeropuertos}
                            </select>
                        </div>
                        <button id="submit-nuevo" className="normal-button middle-button" type="submit">Agregar</button>
                    </form>

                </div>

                <div className={this.state.subComponents.reportes ? 'active sub-component table-container' : 'inactive sub-component table-container'} id="reportes-avion-container">
                    <h2>Reportes</h2>
                    <div id="select-avion-reporte">
                        <h2>
                            Avión
                            <span> {this.state.selectedAvion}</span>
                        </h2>
                        <select name="lista-aviones-reporte" onChange={this.updateVuelosDeAvion}  className="normal-select lista-aviones">
                            {avionesConVuelo}
                        </select>
                    </div>
                    
                    <div id="avion-reporte">
                        <h2>Vuelos de este avión</h2>
                        <table className="normal-table">
                            <thead>
                                <th>Núm. Vuelo</th>
                                <th>Fecha</th>
                            </thead>
                            <tbody>
                                {vuelosDeAvion}
                            </tbody>
                        </table>

                        <h2>Estado: <span>{this.state.estadoAvionSel}</span></h2>

                        <h2>Reporte General</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Avión más usado:</td>
                                    <td>{avionConMasVuelos}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>


                </div>

            </div>
        );
    }
}

export default Avion;