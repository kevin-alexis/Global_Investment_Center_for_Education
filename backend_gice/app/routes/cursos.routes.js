import {Router} from 'express';
import {actualizarCurso, agregarCurso, eliminarCurso, obtenerCursos} from "../Controllers/cursos/cursos.js"
const router = Router()

router.post('/cursos', agregarCurso);
router.get('/cursos', obtenerCursos);
router.put('/cursos', actualizarCurso);
router.delete('/cursos', eliminarCurso);

export default router