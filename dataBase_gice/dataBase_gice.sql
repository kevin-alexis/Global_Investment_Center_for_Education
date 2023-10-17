CREATE DATABASE GICE;
USE GICE;

CREATE TABLE tipoUsuarios(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);

INSERT INTO tipoUsuarios(nombre) VALUES ('admin');
INSERT INTO tipoUsuarios(nombre) VALUES ('user');

CREATE TABLE usuarios(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    correoElectronico VARCHAR(100),
    contraseña VARCHAR(100),
    token VARCHAR(100),
    idTipoUsuarioId INT,
    FOREIGN KEY (idTipoUsuarioId) REFERENCES tipoUsuarios(idTipoUsuario)
);

CREATE TABLE cursos(
	idCurso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    rutaDocumento VARCHAR(100),
    rutaImagen VARCHAR(100),
    numDescargas INT
);

SELECT * FROM cursos;
SELECT * FROM usuarios;

TRUNCATE TABLE usuarios;

SELECT * FROM usuarios WHERE idUsuario = 2;
