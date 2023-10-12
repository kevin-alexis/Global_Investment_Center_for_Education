CREATE DATABASE GICE;
USE GICE;

CREATE TABLE tipoUsuarios(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);

CREATE TABLE usuarios(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    correoElectronico VARCHAR(100),
    contraseña VARCHAR(100),
    idTipoUsuarioId INT,
    FOREIGN KEY (idTipoUsuarioId) REFERENCES tipoUsuarios(idTipoUsuario)
);

CREATE TABLE documentos(
	idDocumento INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion VARCHAR(100),
    rutaDocumento VARCHAR(100),
    rutaImagen VARCHAR(100)
);

CREATE TABLE estadisticas(
	idEstadistica INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    cantidad INT
);


