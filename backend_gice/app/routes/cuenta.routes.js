import {Router} from 'express';
import {iniciarSesion, recuperarCuenta, cambiarContraseña} from "../Controllers/cuenta/cuenta.js"
const router = Router()

router.get('/iniciar-sesion', iniciarSesion);
router.post('/recuperar-cuenta', recuperarCuenta);
router.patch('/cambiar-password', cambiarContraseña);

export default router