
import pool from '../../config/MySQL/database.js';
import multer from 'multer';
import path, { join } from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pdf from 'pdf-parse/lib/pdf-parse.js'

// Obtén la ruta del directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'rutaDocumento', maxCount: 1 },
    { name: 'rutaImagen', maxCount: 1 }
]);

import sizeOf from 'image-size';

// Eliminar pdf e imagen del backend
function eliminarPdfImagen(rutaDocumento, rutaImagen){
    if (fs.existsSync(rutaDocumento)) {
        fs.unlinkSync(rutaDocumento);
    }

    // Eliminar el archivo de la imagen
    if (fs.existsSync(rutaImagen)) {
        fs.unlinkSync(rutaImagen);
    }
}

export const agregarCurso = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al subir el archivo");
            }

            const { titulo, descripcion, idUsuarioId } = req.body;
            const rutaDocumento = req.files['rutaDocumento'][0].path;
            const rutaImagen = req.files['rutaImagen'][0].path;
            const numDescargas = 0;

            const dataBuffer = fs.readFileSync(req.files['rutaDocumento'][0].path);

            try {
                const datosImagen = fs.readFileSync(rutaImagen);
                const dimensiones = sizeOf(datosImagen);
                console.log('Dimensiones de la imagen:', dimensiones);

                try {
                    await pdf(dataBuffer);
                    console.log("Es un PDF válido");

                    try {
                        const result = await pool.query('INSERT INTO cursos(titulo, descripcion, rutaDocumento, rutaImagen, numDescargas, idUsuarioId) VALUES (?, ?, ?, ?, ?, ?)',
                            [titulo, descripcion, rutaDocumento, rutaImagen, numDescargas, idUsuarioId]);

                        res.send({
                            "Agregado": "Curso agregado correctamente"
                        });
                    } catch (error) {
                        console.log(error);
                        eliminarPdfImagen(rutaDocumento, rutaImagen);
                        return res.status(500).send({
                            "Error": "Error al añadir curso a la base de datos"
                        });
                    }
                } catch {
                    console.log("No es pdf");
                    eliminarPdfImagen(rutaDocumento, rutaImagen);
                    return res.send(JSON.stringify({
                        message: "Error el PDF está roto"
                    }));
                }
            } catch {
                console.log("Error la imagen está rota");
                eliminarPdfImagen(rutaDocumento, rutaImagen);
                return res.send(JSON.stringify({
                    message: "Error la imagen está rota"
                }));
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            "Error": "Error interno del servidor"
        });
    }
};

export const descargarCurso = (req, res) => {
    const filename = req.body.rutaDocumento;
    const filePath = path.join(filename);
    const readstream = fs.createReadStream(filePath);
    readstream.pipe(res);
}

export const obtenerCursos = (req, res) => {
    pool.query(`SELECT * FROM cursos`, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send({
                    "Error": "No se encontraron cursos"
                })
            }
        }
    })
};

export const actualizarCurso = (req, res) => {
    upload(req, res, async function (err) {
        const { idCurso, titulo, descripcion } = req.body;
        const rutaDocumentoNueva = req.files['rutaDocumento'] ? req.files['rutaDocumento'][0].filename : null;
        const rutaImagenNueva = req.files['rutaImagen'] ? req.files['rutaImagen'][0].filename : null;

        if(req.files['rutaImagen']){
            try {
                const datosImagen = fs.readFileSync(req.files['rutaImagen'][0].path);
                const dimensiones = sizeOf(datosImagen);
                console.log('Dimensiones de la imagen:', dimensiones);
            } catch {
                console.log("Error la imagen está rota");
                eliminarPdfImagen(`uploads/${rutaDocumentoNueva}`, `uploads/${rutaImagenNueva}`);
                return res.send(JSON.stringify({
                    message: "Error la imagen está rota"
                }));
            }
        }

        if (req.files['rutaDocumento']) {

            const dataBuffer = fs.readFileSync(req.files['rutaDocumento'][0].path);
            try {
                await pdf(dataBuffer)
                console.log("Si es pdf")
            } catch {
                console.log("No es pdf")
                eliminarPdfImagen(`uploads/${rutaDocumentoNueva}`, `uploads/${rutaImagenNueva}`);
                return res.send(JSON.stringify({
                    message: "Error el PDF está roto"
                }));
            }
        }

        

        // Obtener rutas de documentos e imágenes actuales del curso
        pool.query('SELECT rutaDocumento, rutaImagen FROM cursos WHERE idCurso = ?', [idCurso], (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const rutaDocumentoAntigua = result[0].rutaDocumento;
                const rutaImagenAntigua = result[0].rutaImagen;

                // Eliminar archivos antiguos del servidor solo si se proporcionan nuevos archivos
                if (rutaDocumentoNueva && rutaDocumentoAntigua !== rutaDocumentoNueva) {
                    fs.unlink(`${rutaDocumentoAntigua}`, (err) => {
                        if (err) {
                            console.error("Error al eliminar archivo de documento antiguo:", err);
                        } else {
                            console.log("Archivo de documento antiguo eliminado con éxito");
                        }
                    });
                }

                if (rutaImagenNueva && rutaImagenAntigua !== rutaImagenNueva) {
                    fs.unlink(`${rutaImagenAntigua}`, (err) => {
                        if (err) {
                            console.error("Error al eliminar archivo de imagen antiguo:", err);
                        } else {
                            console.log("Archivo de imagen antiguo eliminado con éxito");
                        }
                    });
                }

                // Actualizar la base de datos con las nuevas rutas de archivos solo si se proporcionan nuevos archivos
                const queryParameters = [];
                let updateQuery = 'UPDATE cursos SET ';
                if (rutaDocumentoNueva) {
                    updateQuery += 'rutaDocumento=?, ';
                    queryParameters.push('uploads/' + rutaDocumentoNueva);
                } else {
                    updateQuery += 'rutaDocumento=?, ';
                    queryParameters.push(rutaDocumentoAntigua);
                }

                if (rutaImagenNueva) {
                    updateQuery += 'rutaImagen=?, ';
                    queryParameters.push('uploads/' + rutaImagenNueva);
                } else {
                    updateQuery += 'rutaImagen=?, ';
                    queryParameters.push(rutaImagenAntigua);
                }

                updateQuery += 'titulo=?, descripcion=? WHERE idCurso=?';
                queryParameters.push(titulo, descripcion, idCurso);

                pool.query(updateQuery, queryParameters, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        if (result.affectedRows > 0) {
                            res.status(200).send({
                                "Actualizado": "Curso actualizado correctamente"
                            });
                        } else {
                            res.status(400).send({
                                "Error": "Curso no existente"
                            });
                        }
                    }
                });
            }
        });
    });
};

export const eliminarCurso = (req, res) => {
    const { idCurso, rutaDocumento, rutaImagen } = req.body;

    // Eliminar el curso de la base de datos
    pool.query(`DELETE FROM cursos WHERE idCurso = ?;`, [idCurso], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.affectedRows > 0) {
                // Eliminar el archivo del documento (PDF) e imagen
                eliminarPdfImagen(rutaDocumento, rutaImagen);

                res.status(200).send({
                    "Eliminado": "Curso eliminado correctamente"
                });
            } else {
                res.status(400).send({
                    "Error": "Curso no existente"
                });
            }
        }
    });
};

export const obtenerImagen = (req, res) => {
    const nombreImagen = req.params.nombreImagen;

    const rutaImagen = join(__dirname, '../../../uploads', nombreImagen);
    console.log(rutaImagen);
    try {
        const imagen = readFileSync(rutaImagen);
        res.writeHead(200, {
            'Content-Type': 'image/jpeg', // Ajusta el tipo de contenido según el tipo de imagen
            'Content-Length': imagen.length
        });
        res.end(imagen);
    } catch (error) {
        res.status(404).send({
            "Error": "Imagen no encontrada"
        });
    }
};

export const actualizarCursoDescarga = (req, res) => {
    const { idCurso } = req.body
    pool.query(`UPDATE cursos SET numDescargas = numDescargas + 1 WHERE idCurso = ?;`, [idCurso], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result) {
                res.status(200).send({
                    "Actualizado": "Curso actualizado correctamente"
                })
            } else {
                res.status(400).send({
                    "Error": "Curso no existente"
                })
            }
        }
    })
};


export const obtenerNumDescargar = (req, res) => {
    pool.query(`SELECT SUM(numDescargas) AS totalDescargas FROM cursos`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
};