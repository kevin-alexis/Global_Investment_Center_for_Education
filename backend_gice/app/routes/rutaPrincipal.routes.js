import {Router} from 'express';
import {rutaPrincipal} from "../Controllers/rutaPrincipal/principal.js"
const router = Router()

router.get('/', rutaPrincipal);

export default router