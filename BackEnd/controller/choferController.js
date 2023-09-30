require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const router = express.Router();



var choferDb = require("model/chofer.js");

app.get('/', (req, res) => {
    
    choferDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

module.exports = app;