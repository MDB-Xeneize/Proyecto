// Rutas de escucha (endpoint) disponibles para CHOFERES
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chofer_db = require("model/chofer.js");

// Rutas
app.get('/', getAll);
app.post('/', create);
app.put('/:dni', update);
app.delete('/:dni', deleteChofer);
app.get('/:dni', getByDNI);
app.get('/usuario/:dni', getUserByChofer);

// Funciones utilizadas en endpoints

function getAll(req, res) {
    chofer_db.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function create(req, res) {
    let chofer = req.body;
    chofer_db.create(chofer, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function update(req, res) {
    let chofer = req.body;
    let dni = req.params.dni;
    chofer_db.update(chofer, dni, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function deleteChofer(req, res) {
    let dniChofer = req.params.dni;
    chofer_db.deleteChofer(dniChofer, (err, resultModel) => {
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

function getUserByChofer(req, res) {
    chofer_db.getUserByChofer(req.params.dni, (err, resultModel) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultModel);
        }
    });
}

function getByDNI(req, res) {
    let dni = req.params.dni;
    chofer_db.getByDNI(dni, (err, resultModel) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultModel);
        }
    });
}

module.exports = app;
