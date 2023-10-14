import pool from '../../config/MySQL/database.js';

export const agregarCurso = async (req, res) => {
    try{
        const {titulo, descripcion, rutaDocumento, rutaImagen} = req.body
        const numDescargas = 0;
        const result = await pool.query('INSERT INTO cursos(titulo, descripcion, rutaDocumento, rutaImagen, numDescargas) VALUES (?, ?, ?, ?, ?)',
        [
            titulo, 
            descripcion,
            rutaDocumento,
            rutaImagen,
            numDescargas
        ])
        console.log(result);
        res.send("Creando documento")
    }catch(error){
        console.log(error);
        res.satus(500).send("Error al añadir curso")
    }
};

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