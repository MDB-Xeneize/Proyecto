require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const router = express.Router();



var inOutDb = require("model/InOut.js");

app.get('/', (req, res) => {
    
    inOutDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

app.get('/:id_viaje', (req, res) => {
    params = req.params.id_viaje;
    inOutDb.getByIdViaje(params,(err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else{
            res.json(resultado);
        }
    });
});

app.get('/agregar/chofer', (req, res) => {

    inOutDb.getAllchofer((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else{
            res.json(resultado);
        }
    });
});

app.get('/agregar/vehiculo', (req, res) => {

    inOutDb.getAllvehiculo((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else{
            res.json(resultado);
        }
    });
});

module.exports = app;