import pool from '../../config/MySQL/database.js';

export const agregarUsuario = async (req, res) => {
    try{
        const {nombre, correoElectronico, contraseña, idTipoUsuarioId} = req.body
        const result = await pool.query('INSERT INTO usuarios(nombre, correoElectronico, contraseña, idTipoUsuarioId) VALUES (?, ?, ?, ?)',
        [nombre, correoElectronico, contraseña, idTipoUsuarioId])
        console.log(result);
        res.send("Usuario creado")
    }catch(error){
        console.log(error);
        res.satus(500).send("Error al crear usuario")
    }
};

export const obtenerUsuarios = (req, res) => {  
    pool.query(`SELECT * FROM usuarios`, (err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(result.length > 0){
                res.status(200).send(result);
            }else{
                res.status(400).send('Usuarios no existentes')
            }
        }
    })
};

export const actualizarUsuario = (req, res) => {
    const {idUsuario, nombre, correoElectronico, contraseña, idTipoUsuarioId} = req.body
    pool.query(`UPDATE usuarios SET nombre = ?, correoElectronico = ?, contraseña = ?, idTipoUsuarioId = ? WHERE idUsuario = ?`, 
    [nombre, correoElectronico, contraseña, idTipoUsuarioId, idUsuario], (err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(result.affectedRows > 0){
                res.status(200).send("Usuario modificado");
            }else{
                res.status(400).send('Usuario no existente')
            }
        }
    })
};

export const eliminarUsuario = (req, res) => {
    const {idUsuario} = req.body
    pool.query(`DELETE FROM usuarios WHERE idUsuario = ?;`, [idUsuario],(err, result) =>{
        if(err){
            res.status(500).send(err)
        }else{ 
            if(result){
                res.status(200).send('Usuario eliminado con exito')
            }else{
                res.status(400).send('Usuario no existente')
            }
        }
    })
};