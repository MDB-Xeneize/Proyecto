// Rutas de escucha (endpoint) disponibles para VEHICULOS
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const vehiculo_db = require("model/vehiculo.js");

// Rutas
app.get('/', getAll);
app.post('/', create);
app.put('/:matricula', update);
app.delete('/:matricula', deleteVehiculo);
app.get('/:id_vehiculo', getBymatricula);

// Funciones utilizadas en endpoints

function getAll(req, res) {
    vehiculo_db.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function create(req, res) {
    let vehiculo = req.body;
    vehiculo_db.create(vehiculo, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function update(req, res) {
    let vehiculo = req.body;
    let placa = req.params.placa;
    vehiculo_db.update(vehiculo, placa, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deleteVehiculo(req, res) {
    let matriculaVehiculo = req.params.matricula;
    vehiculo_db.deleteVehiculo(matriculaVehiculo, (err, resultModel) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (resultModel.detail.affectedRows == 0) {
                res.status(404).send(resultModel.message);
            } else {
                res.send(resultModel.message);
            }
        }
    });
}

function getBymatricula(req, res) {
    let placa = req.params.placa;
    vehiculo_db.getByPlaca(placa, (err, resultModel) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultModel);
        }
    });
}

module.exports = app;
