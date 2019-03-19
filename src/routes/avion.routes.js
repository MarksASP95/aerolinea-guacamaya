const express = require('express');
const db = require('../database');

const router = express.Router();

var Avion = db.avion;
var ModeloAvion = db.modelo_avion;
var Proveedor = db.proveedor;
var Op = db.sequelize.Op;
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

//Avion.belongsTo(ModeloAvion, {foreignKey: 'modelo'});

// se utiliza plain text debido al parametro de los LIKE
router.get('/:fabricante/:modelo/:estado', (req, res) => {
    sequelize.query(`SELECT * 
                    FROM avion 
                    INNER JOIN modelo_avion ON avion.modelo = modelo_avion.modelo
                    WHERE modelo_avion.fabricante LIKE "%${req.params.fabricante}%"
                    AND avion.modelo LIKE "%${req.params.modelo}%"
                    AND estado LIKE "%${req.params.estado}%";`,
                    {type: Sequelize.QueryTypes.SELECT})
    .then(aviones => {
        res.send(aviones);
    })
    .catch(err => console.log('Error with database'));
});

//dame todos los modelos
router.get('/modelos', (req, res) => {
    ModeloAvion.findAll({
        attributes: ['modelo', 'fabricante', 'vel_max', 'vel_cru', 'peso_vac', 'internet', 'tv'],
        group: ['modelo'],
        raw: true
    })
    .then(modelos => {
        res.send(modelos);
    })
    .catch(err => console.log('Error with database'));
});

ModeloAvion.hasMany(Avion, {foreignKey: 'modelo'});
Avion.belongsTo(ModeloAvion, {foreignKey: 'modelo'});

// dame todos los aviones de la aerolinea
router.get('/', (req, res) => {
    Avion.findAll({
        attributes: ['id_avi', 'modelo', 'modelo_avion.fabricante'],
        include: [ModeloAvion],
        raw: true
    })
    .then(aviones => {
        res.send(aviones);
    })
    .catch(err => console.log('Error with database'));
});

// dame todos los proveedores
router.get('/proveedores', (req, res) => {
    Proveedor.findAll({
        attributes: ['id_prov', 'nom_prov'],
        raw: true
    })
    .then(proveedores => {
        res.send(proveedores);
    })
    .catch(err => console.log('Error with database'));
})

router.post('/', (req, res) => {
    Avion.create({
        modelo: req.body.modelo,
        id_mant: 1,
        fec_ult_man: null,
        estado: 'EN ESPERA',
        equip_med: true
    })
        .then(response => {
            response.send({'status':'OK'});
        })
        .catch(err => {
            res.send(err);
        })
})

module.exports = router;