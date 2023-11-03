import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <div className='title'>404</div>
      <div className='description'>Página no encontrada</div>
      <Link to='/' className='back-button'>
      <button className='button'>Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default NotFound;
