require('rootpath')();

var chofer_db = {};

const { query } = require('express');
const mysql = require('mysql');
const configuracion = require("config.json");
const { param } = require('../controller/choferController');


var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

chofer_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM chofer';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

module.exports = chofer_db;