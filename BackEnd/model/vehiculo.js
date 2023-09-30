require('rootpath')();

var vehiculo_db = {};

const { query } = require('express');
const mysql = require('mysql');
const configuracion = require("config.json");
const { param } = require('../controller/vehiculoController');


var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

vehiculo_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM vehiculo';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

module.exports = vehiculo_db;