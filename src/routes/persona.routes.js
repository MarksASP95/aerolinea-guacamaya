const express = require('express');
const db = require('../database');

const router = express.Router();

var Persona = db.persona;
var Op = db.sequelize.Op;

router.get('/', (req, res) => {
    Persona.findAll({
        attributes: ['id_persona', 'nom_persona', 'fec_nac'],
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

module.exports = router;