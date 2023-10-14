import {Router} from 'express';
import {actualizarUsuario, agregarUsuario, eliminarUsuario, obtenerUsuarios} from "../Controllers/usuarios/usuarios.js"
const router = Router()

router.post('/usuarios', agregarUsuario);
router.get('/usuarios', obtenerUsuarios);
router.put('/usuarios', actualizarUsuario);
router.delete('/usuarios', eliminarUsuario);

export default router