import {Router} from 'express';
import {iniciarSesion, recuperarCuenta, cambiarContraseña} from "../Controllers/cuenta/cuenta.js"
const router = Router()

router.post('/iniciar-sesion', iniciarSesion);
router.post('/recuperar-cuenta', recuperarCuenta);
router.patch('/cambiar-password', cambiarContraseña);

export default router