const express = require('express');
const db = require('../database');

const groupBy = require('lodash/groupBy');

const router = express.Router();

var Vuelo = db.vuelo;
var Avion = db.avion;
var ModeloAvion = db.modelo_avion;
var Op = db.sequelize.Op;
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

ModeloAvion.hasMany(Avion, {foreignKey: 'modelo'});
Avion.belongsTo(ModeloAvion, {foreignKey: 'modelo'});
Avion.hasMany(Vuelo, {foreignKey: 'id_avi'});
Vuelo.belongsTo(Avion, {foreignKey: 'id_avi'});

// dame todos los vuelos
router.get('/', (req, res) => {
    Vuelo.findAll({
        attributes: ['id_vuelo', 'id_avi', 'origen', 'destino', 'fecha'],
        raw: true
    }).then(vuelos => {
        res.send(vuelos);
    });
});

// dame todos los vuelos por avion
router.get('/poravion', (req, res) => {
    Vuelo.findAll({
        attributes: ['id_vuelo', 'id_avi', 'origen', 'destino', 'fecha'],
        raw: true,
        include: [{model: Avion, required: true, include:[{model: ModeloAvion, required: true}]}]
    }).then(vuelos => {
        res.send(groupBy(vuelos, 'id_avi'));
    });
});

// dame los vuelos por estos origen, destino y fecha
router.get('/:origen/:destino/:fecha', (req, res) => {
    var condOrigen;
    var condDestino;
    var likeAnythingCond = {
        [Op.like]: '%%'
    }

    if(req.params.origen === '_'){
        condOrigen = likeAnythingCond; 
    }
    else{
        condOrigen = req.params.origen;
    }

    if(req.params.destino === '_'){
        condDestino = likeAnythingCond; 
    }
    else{
        condDestino = req.params.destino;
    }

    Vuelo.findAll({
        attributes: ['id_vuelo', 'origen', 'destino', 'fecha'],
        where: {
            origen: condOrigen,
            destino: condDestino,
            fecha: {
                [Op.gte]: req.params.fecha
            }
        },
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

// REPORTES

// sobreabordo
router.get('/reportes/sobreabordo', (req, res) => {
    sequelize.query(
        `SELECT vuelo.id_vuelo, capacidad, SUM(if(asiento.ocupado = 1, 1, 0))  AS 'boletosOtorgados', capacidad - 'boletosOtorgados' AS 'diferencia'
        FROM vuelo 
        INNER JOIN avion ON vuelo.id_avi = avion.id_avi 
        INNER JOIN modelo_avion ON avion.modelo = modelo_avion.modelo
        INNER JOIN asiento ON avion.id_avi = asiento.id_avi
        GROUP BY vuelo.id_vuelo;`,
        {type: Sequelize.QueryTypes.SELECT})
    .then(aviones => {
        res.send(aviones);
    })
});

module.exports = router;