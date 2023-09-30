require('rootpath')();

var inOut_db = {};

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

inOut_db.getAll = function (funCallback) {
    var consulta = 'select * FROM viaje as V inner join tipo_viaje as TV on V.id_tipo=TV.id_tipo inner join vehiculo as VH on V.id_vehiculo=VH.id_vehiculo;';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

inOut_db.getAllchofer = function (funCallback) {
    var consulta = 'select id_chofer,nombre,apellido FROM chofer;';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

inOut_db.getAllvehiculo = function (funCallback) {
    var consulta = 'select id_vehiculo,marca,modelo FROM vehiculo;';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

inOut_db.getByIdViaje = function (id_viaje_busca,funCallback) {
    consulta = 'select * FROM viaje as V inner join tipo_viaje as TV on V.id_tipo=TV.id_tipo inner join vehiculo as VH on V.id_vehiculo=VH.id_vehiculo where id_viaje=?;';
    params = id_viaje_busca;
    connection.query(consulta,params, function (err, rows) {
        if (err) {
            funCallback(err,undefined);
            return;
        } 
            else {
            funCallback(undefined, rows);
        }
    });
}
module.exports = inOut_db;