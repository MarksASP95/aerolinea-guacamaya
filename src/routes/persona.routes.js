const express = require('express');
const db = require('../database');

const router = express.Router();

var Persona = db.persona;
var Empleado = db.empleado;
var Piloto = db.piloto;
var Reserva = db.reserva;
var ReservaPasajero = db.reserva_pasajero;
var Azafata = db.azafata;
var Tripulacion = db.tripulacion;

var sequelize = db.sequelize;
var Sequelize = db.Sequelize;
var Op = db.sequelize.Op;

Empleado.belongsTo(Persona, {foreignKey: 'id_persona'});
Reserva.belongsTo(Persona, {foreignKey: 'id_comprador'});
Persona.hasMany(Reserva, {foreignKey: 'id_persona'});
Persona.hasMany(ReservaPasajero, {foreignKey: 'id_pasajero'});
ReservaPasajero.belongsTo(Reserva, {foreignKey: 'id_reserva'});
Reserva.hasMany(ReservaPasajero, {foreignKey: 'id_reserva'});
ReservaPasajero.belongsTo(Persona, {foreignKey: 'id_pasajero'});

Persona.hasOne(Empleado, {foreignKey: 'id_persona'});
Empleado.hasOne(Piloto, {foreignKey: 'id_emp'});
Empleado.hasOne(Azafata, {foreignKey: 'id_emp'});

// dame todas las personas
router.get('/', (req, res) => {
    Persona.findAll({
        attributes: ['id_persona', 'nom_persona'],
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

// dame todos los empleados
router.get('/empleados', (req, res) => {
    Empleado.findAll({
        attributes: ['persona.id_persona', 'persona.nom_persona'],
        include: [{model: Persona, required: true}],
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

// dame todos los compradores
router.get('/compradores', (req, res) => {
    Reserva.findAll({
        attributes: ['persona.id_persona', 'persona.nom_persona'],
        include: [{model: Persona, required: true}],
        raw: true
    }).then(personas => {
        res.send(personas);
    });
});

// dame todos los pasajeros
router.get('/pasajeros', (req, res) => {
    sequelize.query(
        `SELECT persona.id_persona, persona.nom_persona 
        FROM persona 
        INNER JOIN reserva_pasajero ON persona.id_persona = reserva_pasajero.id_pasajero 
        INNER JOIN reserva ON reserva_pasajero.id_reserva = reserva.id_reserva;`,
        {type: Sequelize.QueryTypes.SELECT}
    ).then(personas => {
        res.send(personas);
    });
});

// dame todos los pilotos
router.get('/pilotos', (req, res) => {
    Persona.findAll({
        attributes: ['empleado.id_emp', 'persona.nom_persona'],
        include: [{model: Empleado, required: true, include: [{model: Piloto, required: true}]}],
        raw: true
    }).then(personas => {
        res.send(personas);
    })
})

// dame todas las azafatas
router.get('/azafatas', (req, res) => {
    Persona.findAll({
        attributes: ['empleado.id_emp', 'persona.nom_persona'],
        include: [{model: Empleado, required: true, include: [{model: Azafata, required: true}]}],
        raw: true
    }).then(personas => {
        res.send(personas);
    })
})

// nueva tripulacion
router.post('/tripulacion', (req, res) => {
    sequelize.transaction(t => {
        var promises = [];
        Object.keys(req.body.empleado).forEach(tipoEmp => {
            for(let i = 0; i < req.body.empleado[tipoEmp].length; i++){
                let newPromise = Tripulacion.create({id_vuelo: req.body.id_vuelo, id_emp: req.body.empleado[tipoEmp][i]}, {transaction: t});
                promises.push(newPromise);
            }
        })
        return Promise.all(promises);
    })
    .then(result => {
        console.log('SUCCESS');
        res.send({'status': 'success'});
    })
    .catch(err => {
        console.log('ROLLBACK NIGGA');
        res.send({'status':'rollback'});
    })
})


module.exports = router;