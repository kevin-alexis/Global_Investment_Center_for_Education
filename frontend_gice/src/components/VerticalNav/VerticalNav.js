import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VerticalNav.css';
import BotonDashUsers from '../../assets/BotonDashUsers.png';
import BotonDashCursos from '../../assets/BotonDashCursos.png';
import BotonDashInicio from '../../assets/BotonDashInicio.png';
import BotonLogOut from '../../assets/LogOut.png';

function VerticalNav() {
    // Recupera el estado del enlace seleccionado de localStorage o establece 'dashboard' como valor predeterminado
    const [selectedLink, setSelectedLink] = useState(
        localStorage.getItem('selectedLink') || 'dashboard'
    );

    const handleLinkClick = (link) => {
        setSelectedLink(link);
        // Almacena el enlace seleccionado en localStorage
        localStorage.setItem('selectedLink', link);
    };

    return (
        <div className='verticalNavBarContainer'>
            <div className='VerticalNavBar VerticalNavBar2'>
                <Link to='/dashboard' className='TextoVerticalNav' onClick={() => handleLinkClick('dashboard')}>
                    GICE
                </Link>
                <div>
                    <div className='VerticalNavBarBotones'>
                        <Link
                            style={{ width: 100 + '%' }}
                            to='/dashboard'
                            className={`NavbarButton ${selectedLink === 'dashboard' ? 'Selected' : ''}`}
                            onClick={() => handleLinkClick('dashboard')}
                        >
                            <img style={{ width: 30 + '%' }} src={BotonDashInicio} alt='Inicio' />
                        </Link>
                        <Link
                            style={{ width: 100 + '%' }}
                            to='/dashboard/cursos'
                            className={`NavbarButton ${selectedLink === 'cursos' ? 'Selected' : ''}`}
                            onClick={() => handleLinkClick('cursos')}
                        >
                            <img style={{ width: 30 + '%' }} src={BotonDashCursos} alt='Cursos' />
                        </Link>
                        <Link
                            style={{ width: 100 + '%' }}
                            to='/dashboard/users'
                            className={`NavbarButton ${selectedLink === 'users' ? 'Selected' : ''}`}
                            onClick={() => handleLinkClick('users')}
                        >
                            <img style={{ width: 30 + '%' }} src={BotonDashUsers} alt='Usuarios' />
                        </Link>
                    </div>
                </div>
                <Link to='/' onClick={() => localStorage.clear()}>
                    <img src={BotonLogOut} alt='Cerrar sesión' className='BotonLogOut' />
                </Link>
            </div>
        </div>
    );
}

export default VerticalNav;
