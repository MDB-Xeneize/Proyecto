CREATE DATABASE backend;

CREATE TABLE CHOFER
(
  apellido VARCHAR(20) NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  dni VARCHAR(10) NOT NULL,
  id_chofer INT NOT NULL auto_increment,
  fecha_nacimiento DATE NOT NULL,
  PRIMARY KEY (id_chofer),
  UNIQUE (dni)
);

CREATE TABLE VEHICULO
(
  carga_maxima INT NOT NULL,
  marca VARCHAR(20) NOT NULL,
  matricula VARCHAR(10) NOT NULL,
  tara INT NOT NULL,
  año INT NOT NULL,
  modelo VARCHAR(20) NOT NULL,
  PRIMARY KEY (matricula)
);

CREATE TABLE TIPO_VIAJE
(
  carga VARCHAR(20) NOT NULL,
  nombre VARCHAR(10) NOT NULL,
  id_tipo INT NOT NULL auto_increment,
  PRIMARY KEY (id_tipo)
);

CREATE TABLE VIAJE
(
  carga VARCHAR(20) NOT NULL,
  id_viaje INT NOT NULL auto_increment,
  destino VARCHAR(30) NOT NULL,
  fecha DATE NOT NULL,
  peso_total INT NOT NULL,
  origen VARCHAR(30) NOT NULL,
  hora TIME NOT NULL,
  id_chofer INT NOT NULL,
  matricula VARCHAR(10) NOT NULL,
  id_tipo INT NOT NULL,
  PRIMARY KEY (id_viaje),
  FOREIGN KEY (id_chofer) REFERENCES CHOFER(id_chofer),
  FOREIGN KEY (matricula) REFERENCES VEHICULO(matricula),
  FOREIGN KEY (id_tipo) REFERENCES TIPO_VIAJE(id_tipo)
);

CREATE TABLE MANTENIMIENTO
(
  id_mantenimiento INT NOT NULL auto_increment,
  service_proximo DATE NOT NULL,
  fecha DATE NOT NULL,
  observaciones VARCHAR(100) NOT NULL,
  matricula VARCHAR(10) NOT NULL,
  PRIMARY KEY (id_mantenimiento),
  FOREIGN KEY (matricula) REFERENCES VEHICULO(matricula)
);

CREATE TABLE USUARIO
(
  rol VARCHAR(15) NOT NULL,
  id_usuario INT NOT NULL auto_increment,
  permisos VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  nickname VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE (id_usuario),
  UNIQUE (nickname)
);

CREATE TABLE gestiona
(
  id_viaje INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_viaje,id_usuario),
  FOREIGN KEY (id_viaje) REFERENCES VIAJE(id_viaje),
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

