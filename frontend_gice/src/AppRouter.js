import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Home from './pages/Home/Home.js'
import Divisas from './pages/Divisas/Divisas.js';
import Noticias from './pages/Noticias/Noticias.js';
import Criptomonedas from './pages/Criptomonedas/Criptomonedas.js';
import Curso from './pages/Curso/Curso.js'
import Login from './pages/Login/Login.js';
import Registro from './pages/Registro/Registro.js';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import DashboardCursos from './pages/DashboardCursos/DashboardCursos.js';
import NotFound from './pages/NotFound/NotFound.js';
import jwt_decode from 'jwt-decode';
import DashboardUsers from './pages/DashBoardUsers/DashBoardUsers.js';
import OlvideMiContraseña from './pages/OlvideMiContraseña/OlvideMiContraseña.js';
import CambiarPassword from './pages/CambiarPassword/CambiarPassword.js';
import MoreDetails from './pages/MoreDetails/MoreDetails.js';


function AppRouter() {
  
  const token_jwt = localStorage.getItem('sesion_token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRoles = decodedToken ? decodedToken.rol : null; // Esto contendrá el rol o los permisos del usuario
  

  const [user, setUser] = useState({
    user_token: localStorage.user_token,
    permissions: [userRoles]
  })

  return (
    <>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/more" element={<MoreDetails />} />
        <Route path="/divisas" element={<Divisas />} />
        <Route path="/criptomonedas" element={<Criptomonedas />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/olvide-contraseña" element={<OlvideMiContraseña />} />
        <Route path="/cambiar-password" element={<CambiarPassword />} />

        {/* RUTAS PROTEGIDAS DEL USUARIO */}
        <Route element={<ProtectedRoute isAllowed={!!user.user_token && user.permissions.includes('user')} />}>
          <Route path="/curso" element={<Curso />} />
        </Route>



        {/* RUTAS PROTEGIDAS DEL ADMIN */}
        <Route element={<ProtectedRoute isAllowed={!!user.user_token && user.permissions.includes('admin')} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/cursos' element={<DashboardCursos />} />
          <Route path='/dashboard/users' element={<DashboardUsers />} />
        </Route>
        
        {/* RUTA NO ENCONTRADA */}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;