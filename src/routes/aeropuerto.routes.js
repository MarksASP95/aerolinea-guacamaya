const express = require('express');
const db = require('../database');
const groupBy = require('lodash/groupBy');

const router = express.Router();

var Aeropuerto = db.aeropuerto;
var Vuelo = db.vuelo;
var sequelize = db.sequelize;
var Op = db.sequelize.Op;

Aeropuerto.hasMany(Vuelo, {foreignKey: 'destino'});
Vuelo.belongsTo(Aeropuerto, {foreignKey: 'destino'});

router.get('/', (req, res) => {
    Aeropuerto.findAll({
        attributes: ['id_aer', 'nom_ciudad'],
        raw: true
    }).then(aeropuertos => {
        res.send(aeropuertos);
    });
});

// dame aeropuertos por ciudad
router.get('/porciudad', (req, res) => {
    Aeropuerto.findAll({
        attributes: ['id_aer', 'nom_ciudad'],
        raw: true
    }).then(aeropuertos => {
        res.send(groupBy(aeropuertos, 'id_aer'));
    });
});

// dame ciudades mas visitadas
router.get('/masvisitados', (req, res) => {
    Aeropuerto.findAll({
        attributes: ['aeropuerto.nom_ciudad', [sequelize.fn('COUNT', 'vuelo.id_vuelo'), 'cantidadDeVuelosA']],
        include: [{model: Vuelo, required: true}],
        group: ['aeropuerto.nom_ciudad'],
        order: [[sequelize.literal('cantidadDeVuelosA'), 'DESC']],
        raw: true
    }).then(ciudades => {
        res.send(ciudades);
    })
})

module.exports = router;