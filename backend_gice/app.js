import express from 'express';
const app = express(); //Servidor
import indexRoutes from './app/routes/index.routes.js';
import rutaPrincipalRoutes from './app/routes/rutaPrincipal.routes.js';
import cursosRoutes from './app/routes/cursos.routes.js';
import usuariosRoutes from './app/routes/usuarios.routes.js';
import cuentaRoutes from './app/routes/cuenta.routes.js';
import middlewares from './app/middleware/middleware.js';

app.use(middlewares);
app.use(indexRoutes);
app.use(rutaPrincipalRoutes);
app.use(cursosRoutes);
app.use(usuariosRoutes);
app.use(cuentaRoutes);
app.use('/uploads', express.static('uploads'));

export default app;