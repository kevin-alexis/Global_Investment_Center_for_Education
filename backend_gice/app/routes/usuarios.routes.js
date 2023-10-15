import {Router} from 'express';
import {actualizarUsuario, agregarUsuario, eliminarUsuario, obtenerUsuarios, obtenerCantidadUsuarios} from "../Controllers/usuarios/usuarios.js"
const router = Router()

router.post('/usuarios', agregarUsuario);
router.get('/usuarios', obtenerUsuarios);
router.put('/usuarios', actualizarUsuario);
router.delete('/usuarios', eliminarUsuario);
router.get('/cantidad-usuarios', obtenerCantidadUsuarios);

export default router