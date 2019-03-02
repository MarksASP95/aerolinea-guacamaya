const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('bwcu5y15a62g3sdbkekx', 'uvyfncr6ykonmf1f', 'iwZLnOpfJzJkhNtwfFgV', {
    host: 'bwcu5y15a62g3sdbkekx-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.error("Unable to connect to database: ", err);
    });

const dir = path.join(__dirname, 'models');

fs.readdirSync(dir).forEach(filename => {
    const modelDir = path.join(dir, filename);
    const model = sequelize.import(modelDir);
    module.exports[model.name] = model;
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;