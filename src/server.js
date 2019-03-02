const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');

const db = require('./database');

const ModeloAvion = db.modelo_avion;
var Op = db.sequelize.Op;

const app = express();


app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
//app.use('/route', require());

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// START SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

/* Avion.findAll({attributes: ['modelo', 'id_mant', 'estado', 'equip_med'],
     where: {
        nom_persona: {
            [Op.like]: 'D%'
        }
    },
    raw: true
})
.then(personas => {
    console.log(personas);
})
.catch(err => {
    console.log(err);
});
 */

/* ModeloAvion.findAll({raw: true})
    .then(modelos => console.log(modelos));
 */
