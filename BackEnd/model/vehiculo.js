// Configuraciones iniciales
require('rootpath')();
const mysql = require('mysql');
const configuracion = require("config.json");

// Inicializa la conexión entre el servidor y la base de datos
const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Base de datos conectada");
    }
});

const vehiculo_db = {};

// C = CREATE
vehiculo_db.create = function (datos, funCallback) {
    const consulta = "INSERT INTO vehiculo (carga_maxima, marca, matricula, tara, año, modelo) VALUES (?,?,?,?,?,?);";
    const params = [datos.carga_maxima, datos.marca, datos.matricula, datos.tara, datos.año, datos.modelo];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                funCallback({
                    message: "El vehículo ya fue registrado anteriormente",
                    detail: err
                });
            } else {
                funCallback({
                    message: "Error diferente",
                    detail: err
                });
            }
        } else {
            funCallback(undefined, {
                message: `Se creó el vehículo ${datos.marca} ${datos.modelo}`,
                detail: rows
            });
        }
    });
}

// R = READ
vehiculo_db.getAll = function (funCallback) {
    const consulta = 'SELECT * FROM vehiculo';
    connection.query(consulta, (err, rows) => {
        if (err) {
            funCallback({
                message: "Ha ocurrido un error inesperado al buscar el vehículo",
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}

// U = UPDATE
vehiculo_db.update = function (datos, matricula, funCallback) {
    const consulta = "UPDATE vehiculo SET marca = ?, tara= ?, modelo = ? WHERE matricula = ?";
    const params = [datos.matricula, datos.marca, datos.modelo, matricula];

    connection.query(consulta, params, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                funCallback({
                    message: `Se modificó el vehículo ${datos.marca} ${datos.modelo}`,
                    detail: err
                });
            } else {
                funCallback({
                    message: "Error diferente, analizar código de error",
                    detail: err
                });
            }
        } else if (result.affectedRows === 0) {
            funCallback({
                message: "No existe vehículo que coincida con el criterio de búsqueda",
                detail: result
            });
        } else {
            funCallback(undefined, {
                message: `Se modificó el vehículo ${datos.marca} ${datos.modelo}`,
                detail: result
            });
        }
    });
}


// D = DELETE
vehiculo_db.deleteVehiculo = function (placa, funCallback) {
    const consulta = "DELETE FROM vehiculo WHERE matricula = ?";
    connection.query(consulta, placa, (err, result) => {
        if (err) {
            funCallback({ message: err.code, detail: err });
        } else {
            if (result.affectedRows === 0) {
                funCallback(undefined, {
                    message: "No se encontró un vehículo con la matricula ingresada",
                    detail: result
                });
            } else {
                funCallback(undefined, { message: "Vehículo eliminado", detail: result });
            }
        }
    });
}

// Obtener vehículo por placa
vehiculo_db.getBymatricula = function (placa, funCallback) {
    const consulta = 'SELECT * FROM vehículo WHERE placa = ?';
    connection.query(consulta, placa, (err, result) => {
        if (err) {
            funCallback({
                message: "Ha ocurrido algún error inesperado al buscar el vehículo",
                detail: err
            });
        } else if (result.length === 0) {
            funCallback(undefined, {
                message: `No se encontró un vehículo con la placa: ${placa}`,
                detail: result
            });
        } else {
            funCallback(undefined, {
                message: `Los datos del vehículo con la placa ${placa} son:`,
                detail: result
            });
        }
    });
}

// Exportamos el objeto vehiculo_db para que Node.js lo haga público y pueda utilizarse desde otros módulos
module.exports = vehiculo_db;
