const express = require('express');
const db = require('../database');

const router = express.Router();

var Proveedor = db.proveedor;
var Op = db.sequelize.Op;

router.get('/', (req, res) => {
    Proveedor.findAll({
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

module.exports = router;