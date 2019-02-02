const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');

const db = require('./database');

const City = db.city;
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

City.findAll({attributes: ['Name', 'CountryCode', 'Population'],
    where: {
        Name: 'Caracas'
    },
    raw: true
})
.then(cities => {
    console.log(cities);
})
.catch(err => {
    console.log(err);
});

