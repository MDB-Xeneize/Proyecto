CREATE DATABASE backend;

CREATE TABLE CHOFER (
  dni INT NOT NULL UNIQUE,
  id_chofer INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  apellido_nombre VARCHAR(20),
  fecha_nacimiento DATE,
  edad INT,
  carnet VARCHAR(20)
);


CREATE TABLE CAMIONES (
  patente VARCHAR(20) NOT NULL ,
  id_camion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(20),
  capacidad_carga INT,
  modelo VARCHAR(20),
  peso_camion INT
);

CREATE TABLE ENTRADA (
  peso_entrada INT,
  carga VARCHAR(20),
  id_entrada INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hora_entrada TIME,
  fecha_entrada DATE,
  id_chofer INT NOT NULL,
  id_viaje INT NOT NULL,
  id_camion INT NOT NULL,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion),
  FOREIGN KEY (id_chofer) REFERENCES CHOFER(dni)
);

CREATE TABLE SALIDA (
  destino VARCHAR(20),
  peso_salida INT,
  fecha_salida DATE,
  hora_salida TIME,
  carga VARCHAR(20),
  id_salida INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_chofer INT NOT NULL,
  id_camion INT NOT NULL,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion),
  FOREIGN KEY (id_chofer) REFERENCES CHOFER(dni)
);

CREATE TABLE MANTENIMIENTO (
  id_mantenimiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_camion INT NOT NULL,
  service_ultimo DATE,
  service_proximo DATE,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion)
);

