CREATE DATABASE GICE;
USE GICE;

CREATE TABLE tipoUsuarios(
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(100)
);

INSERT INTO tipoUsuarios(rol) VALUES ('admin');
INSERT INTO tipoUsuarios(rol) VALUES ('user');

CREATE TABLE plataformas(
	idPlataforma INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);

INSERT INTO plataformas(nombre) VALUES ('interno');
INSERT INTO plataformas(nombre) VALUES ('google');

CREATE TABLE usuarios(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    correoElectronico VARCHAR(100),
    contraseña VARCHAR(100),
    token VARCHAR(100),
    idTipoUsuarioId INT,
    idPlataformaId INT,
    FOREIGN KEY (idTipoUsuarioId) REFERENCES tipoUsuarios(idTipoUsuario),
    FOREIGN KEY (idPlataformaId) REFERENCES plataformas(idPlataforma)
);

/*
ALTER TABLE usuarios
ADD COLUMN idPlataformaId INT,
ADD CONSTRAINT fk_plataforma
    FOREIGN KEY (idPlataformaId)
    REFERENCES plataformas(idPlataforma);
*/

/*
CREATE TABLE usuariosGoogle(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    correoElectronico VARCHAR(100),
    token VARCHAR(100),
    idTipoUsuarioId INT,
    FOREIGN KEY (idTipoUsuarioId) REFERENCES tipoUsuarios(idTipoUsuario)
);*/

CREATE TABLE cursos(
	idCurso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    rutaDocumento VARCHAR(100),
    rutaImagen VARCHAR(100),
    numDescargas INT,
    idUsuarioId INT,
    FOREIGN KEY (idUsuarioId) REFERENCES usuarios(idUsuario)
);

/*
ALTER TABLE cursos
ADD COLUMN idUsuarioId INT,
ADD CONSTRAINT fk_usuario
    FOREIGN KEY (idUsuarioId) 
    REFERENCES usuarios(idUsuario);
*/

SELECT * FROM cursos;
SELECT * FROM usuarios;
SELECT * FROM usuariosGoogle;
SELECT * FROM tipoUsuarios;

-- TRUNCATE TABLE usuariosGoogle;

-- SELECT usuarios.idUsuario, usuarios.nombre, usuarios.correoElectronico, usuarios.contraseña, usuarios.token, tipoUsuarios.rol
-- FROM usuarios
-- INNER JOIN tipoUsuarios ON usuarios.idTipoUsuarioId = tipoUsuarios.idTipoUsuario
-- WHERE usuarios.correoElectronico = 'Admin@gmail.com';





