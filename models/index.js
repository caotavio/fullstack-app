'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  // sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize = new Sequelize("postgres://yvdxjkyjfrpmxq:f13873fd59b07f3a5b676729051d15bdc8c7df60ee5f7ef464129f80926e7403@ec2-54-228-243-29.eu-west-1.compute.amazonaws.com:5432/d7p39329ncgsns", config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  //sequelize = new Sequelize("postgres://postgres:2325@localhost:5432/postgres", config);
  // sequelize = new Sequelize("postgres://yvdxjkyjfrpmxq:f13873fd59b07f3a5b676729051d15bdc8c7df60ee5f7ef464129f80926e7403@ec2-54-228-243-29.eu-west-1.compute.amazonaws.com:5432/d7p39329ncgsns", config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
