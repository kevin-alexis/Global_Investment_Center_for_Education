import pool from "../../config/MySQL/database.js";
import crypto from "crypto"; // Librería para generar tokens aleatorios
import bcrypt from "bcrypt"; // Librería para encriptar contraseñas

// Función para hashear la pass con salt y key stretching
async function hashPassword(password) {
  const saltRounds = 12; 
// ? Número de rondas de key stretching - hacerlo lento, contrataca el ataques de fuerza bruta y diccionario. 
// ? Para hacer que estos ataques sean menos efectivos, podemos hacer que el proceso de hash sea más lento, 
// ? haciendo que la función de hash incluya un número alto de iteraciones internas. 
// ? Esta técnica es conocida como Key stretching.
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Función para verificar la pass
async function checkPassword(inputPassword, hashedPassword) {
  try {
      const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
      return passwordMatch;
  } catch (error) {
      throw error;
  }
}

// Función para generar un token aleatorio
function generateToken() {
  return crypto.randomBytes(32).toString("hex"); // Genera un token hexadecimal de 128 caracteres (64 bytes)
}

export const agregarUsuario = async (req, res) => {

   try{

    const { nombre, correoElectronico, pass, idTipoUsuarioId } = req.body;
    console.log("prueba",req.body);

    pool.query("SELECT correoElectronico FROM usuarios WHERE correoElectronico = ?",[correoElectronico], async (err, result) => {
      console.log(result);
      if(result.length > 0) {
        return res.status(400).send({mensaje: "El correo electrónico ya está registrado"})
      }else{
        const hashedPassword = await hashPassword(pass);
        const token = generateToken();
        const result = await pool.query(
          "INSERT INTO usuarios(nombre, correoElectronico, pass, token, idTipoUsuarioId) VALUES (?, ?, ?, ?, ?)",
          [nombre, correoElectronico, hashedPassword, token, idTipoUsuarioId]
        );
        console.log(result);
        res.send({mensaje: "creado"});
      } 

    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear usuario");
  }
};

export const obtenerUsuarios = (req, res) => {
  console.log("prueba");
  pool.query(`SELECT * FROM usuarios`, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(400).send("Usuarios no existentes");
      }
    }
  });
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { idUsuario, nombre, correoElectronico, pass /*idTipoUsuarioId*/ } = req.body;
    pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario], async (err, result) =>{
      if (result.length === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }  
      const contraseñaCoincidePlano = await checkPassword(pass, result[0].pass);
      const contraseñaCoincideHash = (pass === result[0].pass);
      let hashedPassword = result[0].pass;
  
      if (!contraseñaCoincidePlano && !contraseñaCoincideHash) {
        hashedPassword = await hashPassword(pass);
      }
  
      await pool.query(
        `UPDATE usuarios SET nombre = ?, correoElectronico = ?, pass = ? WHERE idUsuario = ?`,
        [nombre, correoElectronico, hashedPassword, /*idTipoUsuarioId,*/ idUsuario]
      );
  
      res.json({ message: "Usuario modificado" });
    });
    
    
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarUsuario = (req, res) => {
  console.log("eliminarUsuario")
  const { idUsuario } = req.body;
  console.log(idUsuario)
  if(!idUsuario) return res.status(400).send("id de usuario requerido")
  pool.query(
    `DELETE FROM usuarios WHERE idUsuario = ?;`,
    [idUsuario],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result) {
          res.status(200).send({mensaje: "Usuario eliminado con exito"});
        } else {
          res.status(404).send("Usuario no existente");
        }
      }
    }
  );
};

export const obtenerCantidadUsuarios = (req, res) => {
  pool.query(
    `SELECT * FROM usuarios;`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result) {
          res.status(200).json(result.length);
        } else {
          res.status(400).send("Usuario no existente");
        }
      }
    }
  );
};