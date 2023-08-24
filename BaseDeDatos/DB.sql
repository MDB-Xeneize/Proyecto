CREATE DATABASE backend;


CREATE TABLE CHOFER (
  dni INT NOT NULL,
  ip_chofer INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  apellido_nombre VARCHAR(20),
  fecha_nacimiento DATE,
  edad INT,
  carnet VARCHAR(20)
  );

CREATE TABLE CAMIONES (
  patente VARCHAR(20) NOT NULL,
  id_camion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  marca VARCHAR(20),
  capacidad_carga INT,
  modelo VARCHAR(20),
  peso_camion INT  
);

CREATE TABLE ENTRADA (
  peso_entrada INT,
  carga VARCHAR(20),
  id_entrada INT NOT NULL primary key AUTO_INCREMENT,
  hora_entrada INT,
  fecha_entrada DATE,
  id_chofer INT NOT NULL UNIQUE,
  id_viaje INT NOT NULL UNIQUE,
  id_camion INT NOT NULL UNIQUE,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion),
  FOREIGN KEY (id_chofer) REFERENCES CHOFER(id_chofer)
);

CREATE TABLE SALIDA (
  destino VARCHAR(20),
  peso_salida INT,
  fecha_salida DATE,
  hora_salida INT,
  carga VARCHAR(20),
  id_salida INT NOT NULL primary key AUTO_INCREMENT,
  id_chofer INT NOT NULL UNIQUE,
  id_camion INT NOT NULL UNIQUE,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion),
  FOREIGN KEY (id_chofer) REFERENCES CHOFER(id_chofer)
);

CREATE TABLE MANTENIMIENTO (
  id_mantenimiento INT NOT NULL primary key AUTO_INCREMENT,
  id_camion INT NOT NULL UNIQUE,
  service_ultimo DATE,
  service_proximo DATE,
  FOREIGN KEY (id_camion) REFERENCES CAMIONES(id_camion)
  
);

