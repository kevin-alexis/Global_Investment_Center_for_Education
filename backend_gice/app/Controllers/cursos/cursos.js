import pool from '../../config/MySQL/database.js';
import multer from 'multer';
import path, {join} from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtén la ruta del directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'rutaDocumento', maxCount: 1 },
    { name: 'rutaImagen', maxCount: 1 }
]);

export const agregarCurso = async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                // Manejar errores de Multer
                console.log(err);
                return res.status(500).send("Error al subir el archivo");
            }

            const { titulo, descripcion } = req.body;
            const rutaDocumento = req.files['rutaDocumento'][0].filename;
            const rutaImagen = req.files['rutaImagen'][0].filename;
            const numDescargas = 0;

            try {
                const result = await pool.query('INSERT INTO cursos(titulo, descripcion, rutaDocumento, rutaImagen, numDescargas) VALUES (?, ?, ?, ?, ?)',
                    [titulo, descripcion, rutaDocumento, rutaImagen, numDescargas]);

                console.log(result);
                res.send("Curso agregado correctamente");
            } catch (error) {
                console.log(error);
                res.status(500).send("Error al añadir curso a la base de datos");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor");
    }
};

export const descargarCurso = (req, res) => {
    const filename = req.body.rutaDocumento;
    const filePath = path.join('uploads', filename);
    const readstream = fs.createReadStream(filePath);
    readstream.pipe(res);
}

export const obtenerCursos = (req, res) => {  
    pool.query(`SELECT * FROM cursos`, (err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(result.length > 0){
                res.status(200).send(result);
            }else{
                res.status(400).send('Cursos no existentes')
            }
        }
    })
};

export const actualizarCurso = (req, res) => {
    const {idCurso, titulo, descripcion, rutaDocumento, rutaImagen} = req.body
    pool.query(`UPDATE cursos SET titulo = ?, descripcion = ?, rutaDocumento = ?, rutaImagen = ? WHERE idCurso = ?`, [titulo, descripcion, rutaDocumento, rutaImagen, idCurso], (err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(result.affectedRows > 0){
                res.status(200).send("Curso modificado");
            }else{
                res.status(400).send('Curso no existente')
            }
        }
    })
};

export const eliminarCurso = (req, res) => {
    const {idCurso} = req.body
    pool.query(`DELETE FROM cursos WHERE idCurso = ?;`, [idCurso],(err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{ 
            if(result){
                res.status(200).send('Curso eliminado con exito')
            }else{
                res.status(400).send('Curso no existente')
            }
        }
    })
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
        res.status(404).send('Imagen no encontrada');
    }
};