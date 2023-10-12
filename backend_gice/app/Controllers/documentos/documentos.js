import pool from '../../config/MySQL/database.js';

export const agregarDocumento = async (req, res) => {
    const {titulo, descripcion, rutaDocumento, rutaImagen} = req.body
    const result = await pool.query('INSERT INTO documentos(titulo, descripcion, rutaDocumento, rutaImagen) VALUES (?, ?, ?, ?)',
    [
        titulo, 
        descripcion,
        rutaDocumento,
        rutaImagen
    ])
    console.log(result)
    res.send("Creando documento")
};

// export const obtenerDocumentos = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM documentos');  
//         const documentos = JSON.stringify(result[0])
//         console.log(documentos);
//         res.send(documentos);
//     } catch (error) {
//         console.error("Error al obtener documentos:", error);
//         res.status(500).send("Error al obtener documentos");
//     }
// };

export const actualizarDocumento = (req, res) => {
    res.send('Hola mundo!');
};

export const eliminarDocumento = (req, res) => {
    res.send('Hola mundo!');
};