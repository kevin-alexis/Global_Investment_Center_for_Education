import SimboloDescarga from '../../assets/SimboloDescarga.png';
import CirculoMasAmarillo from '../../assets/CirculoMasAmarillo.png';
import CirculoMasRojo from '../../assets/CirculoMasRojo.png';
import Game from '../../assets/Game.png';
import CrearCRUD from '../DashBoardCRUD/CrearCRUD'


import BloqueDashHome from './BloqueDashHome';
import './DashHome.css';
import { useEffect, useState } from 'react';

function DashHome() {

    const GICE_API = process.env.REACT_APP_URL_API;
    const [abrirNuevo, setAbrirNuevo] = useState(false)
    const [titulo, setTitulo] = useState('Users');
    const [usuario, setUsuarios] = useState();
    const [numDescargas, setNumDescargas] = useState(0);
    const [usuarioGoogle, setUsuariosGoogle] = useState();
    // const [usersOrCurso, setUsersOrCurso] = useState({})
    const usersOrCurso = {}


    const cantidadUsuario = () =>{
        fetch(`${GICE_API}/cantidad-usuarios`)
        .then(response => response.json())
        .then(data => {setUsuarios(data)})
        .catch(error => console.log(error))

        
    }

    const cantidadDescargas = () =>{
        fetch(`${GICE_API}/cursos/num-descarga`)
        .then(response => response.json())
        .then(data => {setNumDescargas(data)})
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
        cantidadDescargas();
        cantidadUsuarioGoogle();  
    },[])

    function obtenerFechaActual() {
        const fechaActual = new Date();
    
        // Obtiene el día, el mes y el año de la fecha actual
        const dia = fechaActual.getDate().toString().padStart(2, '0'); // Pone el día en formato de dos dígitos
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Pone el mes en formato de dos dígitos (los meses comienzan desde 0)
        const anio = fechaActual.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año
    
        // Formatea la fecha como "dd-mm-yy"
        const fechaFormateada = `${dia}-${mes}-${anio}`;
    
        return fechaFormateada;
    }
    
    const fechaActualFormateada = obtenerFechaActual();   
    
    const FuncCrearUsuario = () => {
        setAbrirNuevo(true)
        setTitulo('Users')
    }

    const FuncCrearCurso = () => {
        setAbrirNuevo(true)
        setTitulo('Cursos')

    }


    return (
        <>
            {abrirNuevo
                ?
                <CrearCRUD titulo ={titulo} usersOrCurso = {usersOrCurso}/>
                :
                <div className="DashboardContent">
                <div className="DashboardDate">
                    {fechaActualFormateada}
                </div>
                    <h2 className="DashboardNombreUsuario">Bienvenido</h2>
                    <div className="DashboardOptions">
                        <BloqueDashHome imagen ={SimboloDescarga} tittle={numDescargas[0]?.totalDescargas ?? 0} text={'Downloads'} color={'180,180,180'} />
                        <BloqueDashHome imagen ={Game} tittle={(usuario ?? 0)+ (usuarioGoogle ?? 0)} text={'Usuarios registrados'} color={'47,229,167'} />
                        <BloqueDashHome imagen ={CirculoMasRojo} tittle={'Añadir Usuario'} text={''} color={'255,105,176'} onClick={FuncCrearUsuario} titulo={'Users'} setAbrirNuevo={setAbrirNuevo}/>
                        <BloqueDashHome imagen ={CirculoMasAmarillo} tittle={'Añadir Documento'} text={''} color={'228,232,49'} onClick={FuncCrearCurso} titulo={'Cursos'} setAbrirNuevo={setAbrirNuevo}/>                    
                    </div>
    
                </div>
            }

        </> 
    )
}

export default DashHome