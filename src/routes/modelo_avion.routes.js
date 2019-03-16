const express = require('express');
const db = require('../database');

const router = express.Router();

var ModeloAvion = db.modelo_avion;
var Op = db.sequelize.Op;

router.get('/', (req, res) => {
    ModeloAvion.findAll({
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

module.exports = router;