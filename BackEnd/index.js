require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require('cors')

app.use(cors())
//const router = express.Router();
//app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const configuracion = require("config.json");


//const controladorPersona = require("controller/personaController.js");
const controladorUsuario = require("controller/usuarioController.js");
const controladorVehiculo = require("controller/vehiculoController.js");
const controladorChofer = require("controller/choferController.js");
const controladorInOut= require("controller/inOutController.js");

//app.use('/api/persona', controladorPersona);
app.use('/api/usuario', controladorUsuario);
app.use('/api/vehiculo', controladorVehiculo);
app.use('/api/chofer', controladorChofer);
app.use('/api/inOut', controladorInOut);


//aplicacion --> cuando se ejecuta el use hace dos cosas
//(todo lo que entre aca, enviamelo aca)

app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + configuracion.server.port);
    }
});