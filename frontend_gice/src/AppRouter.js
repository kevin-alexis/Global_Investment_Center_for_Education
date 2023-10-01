import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Home from './pages/Home/Home.js'
import Divisas from './pages/Divisas/Divisas.js';

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/noticias" element={<Home/>}/>
        <Route path="/divisas" element={<Divisas/>}/>
        <Route path="/curso" element={<Home/>}/>
        <Route path="/login" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default AppRouter;