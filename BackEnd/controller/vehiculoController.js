require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const router = express.Router();



var vehiculoDb = require("model/vehiculo.js");

app.get('/', (req, res) => {
    
    vehiculoDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

module.exports = app;