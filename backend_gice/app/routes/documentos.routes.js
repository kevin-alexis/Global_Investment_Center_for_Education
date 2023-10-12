import {Router} from 'express';
// import {agregarDocumento, obtenerDocumentos} from "../Controllers/documentos/documentos.js"
import {agregarDocumento} from "../Controllers/documentos/documentos.js"
const router = Router()

router.post('/agregar-documento', agregarDocumento);
// router.get('/obtener-documentos', obtenerDocumentos);

export default router