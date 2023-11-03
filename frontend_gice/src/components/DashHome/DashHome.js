import SimboloDescarga from '../../assets/SimboloDescarga.png';
import CirculoMasAmarillo from '../../assets/CirculoMasAmarillo.png';
import CirculoMasRojo from '../../assets/CirculoMasRojo.png';
import Game from '../../assets/Game.png';


import BloqueDashHome from './BloqueDashHome';
import './DashHome.css';
import { useEffect, useState } from 'react';

function DashHome() {

    const GICE_API = process.env.REACT_APP_URL_API;

    const [usuario, setUsuarios] = useState();
    const [usuarioGoogle, setUsuariosGoogle] = useState();


    const cantidadUsuario = () =>{
        fetch(`${GICE_API}/cantidad-usuarios`)
        .then(response => response.json())
        .then(data => {setUsuarios(data)})
        .catch(error => console.log(error))

        
    }

    const cantidadUsuarioGoogle = () =>{
        fetch(`${GICE_API}/cantidad-usuarios-google`)
        .then(response => response.json())
        .then(data => {setUsuariosGoogle(data)})
        .catch(error => console.log(error))

        
    }




    useEffect(()=>{
        cantidadUsuario();
        cantidadUsuarioGoogle();    
    },[])

    return (
        <>
            <div className="DashboardContent">
                <h2 className="DashboardNombreUsuario">USUARIO</h2>
                <div className="DashboardOptions">
                    <BloqueDashHome imagen ={SimboloDescarga} tittle={'178+'} text={'Downloads'} color={'180,180,180'} />
                    <BloqueDashHome imagen ={Game} tittle={usuario+usuarioGoogle} text={'Usuarios registrados'} color={'47,229,167'} />
                    <BloqueDashHome imagen ={CirculoMasRojo} tittle={'Añadir Usuario'} text={''} color={'255,105,176'} />
                    <BloqueDashHome imagen ={CirculoMasAmarillo} tittle={'Añadir Documento'} text={''} color={'228,232,49'} />                    
                </div>

            </div>
        </> 
    )
}

export default DashHome