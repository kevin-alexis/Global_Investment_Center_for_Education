import {Router} from 'express';
import {actualizarCurso, agregarCurso, eliminarCurso, obtenerCursos, descargarCurso, obtenerImagen, actualizarCursoDescarga} from "../Controllers/cursos/cursos.js"
const router = Router()

router.post('/cursos', agregarCurso);
router.get('/cursos', obtenerCursos);
router.put('/cursos', actualizarCurso);
router.delete('/cursos', eliminarCurso);
router.post('/cursos/descargar', descargarCurso);
router.get('/cursos/imagen/:nombreImagen', obtenerImagen);
router.post('/cursos/actualizar-descarga', actualizarCursoDescarga);

export default router