const express = require('express');
const db = require('../database');
const groupBy = require('lodash/groupBy');

const router = express.Router();

var Ruta = db.ruta;
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;
var Op = db.sequelize.Op;

// dame todas las rutas por agrupadas por id_avi
router.get('/', (req, res) => {
    Ruta.findAll({
        raw: true
    }).then(rutas => {
        res.send(groupBy(rutas, 'id_avi'));
    });
});

// dame aviones que tienen ruta
router.get('/aviones', (req, res) => {
    sequelize.query(
        `SELECT ruta.id_avi, avion.modelo, modelo_avion.fabricante 
        FROM ruta 
        INNER JOIN avion ON ruta.id_avi = avion.id_avi 
        INNER JOIN modelo_avion ON avion.modelo = modelo_avion.modelo
        GROUP BY avion.id_avi;`,
        {type: Sequelize.QueryTypes.SELECT})
        .then(aviones => {
            res.send(aviones);
        })
})

// agregar ruta
router.post('/', (req, res) => {
    var error;
    Ruta.create({
        origen: req.body.origen,
        destino: req.body.destino,
        id_avi: req.body.id_avi
    })
    .then(res => {
        res.send({'status': 'OK'});
    })
    .catch(err => {
        res.send(err);
    })
})


module.exports = router;