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

app.use('/persona', require('./routes/persona.routes'));
app.use('/avion', require('./routes/avion.routes'));
app.use('/proveedor', require('./routes/proveedor.routes'));
app.use('/modelo_avion', require('./routes/modelo_avion.routes'));
app.use('/aeropuerto', require('./routes/aeropuerto.routes'));
app.use('/vuelo', require('./routes/vuelo.routes'));
app.use('/ruta', require('./routes/ruta.routes'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// START SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
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
