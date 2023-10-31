import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./CambiarContraseña.css"
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';

const CambiarPassword  = () => {

    const [datos, setDatos] = useState({
        contraseña:'',
        confirmarContraseña:'',
    })

    // Obtén la URL actual del navegador
    const urlString = window.location.href;

    // Crea un objeto URL a partir de la URL actual
    const url = new URL(urlString);

    // Obtiene los parámetros de la URL
    const params = new URLSearchParams(url.search);

    // Obtiene los valores de 'token' e 'idUsuario' de los parámetros
    const token = params.get('token');
    const idUsuario = params.get('idUsuario');

    const enviarCorreo = (e) => {
        e.preventDefault();
        
        if(datos.contraseña === datos.confirmarContraseña){
            const URL = `http://localhost:8080/cambiar-password?token=${token}&&idUsuario=${idUsuario}`;

        // Fetch options
        const requestOptions = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        };

        // Fetch request
        fetch(URL, requestOptions)
            .then(response => {
                if (response.ok) {
                    // Si la respuesta es exitosa, muestra una alerta de éxito y redirige al usuario a la página '/dashboard'
                    Swal.fire({
                        title: 'Contraseña Cambiada Satisfactoriamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/login';
                    });
                } else {
                    // Si la respuesta no es exitosa, muestra una alerta de error
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch((error) => {
                // Si hay un error de red, muestra una alerta de error
                console.error('Error de red:', error);
                Swal.fire({
                    title: 'Error de red',
                    text: 'Ocurrió un problema de red, por favor intenta de nuevo más tarde',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const [show, setShow] = useState(false);
    return (
        <div className='CambiarContraseña'>
            <div className='imageContainer'></div>
            <Navbar show={show} setShow={setShow} />
            {show ?
                null :
                <div className='CambiarContraseñaContainer'>
                    <div className='titleContainer'>
                        <h1 className='titleCambiarContraseña'>Cambiar Contraseña</h1>
                    </div>
                    <div className='CambiarContraseñaFormContainer'>

                        <form className='CambiarContraseñaForm' onSubmit={enviarCorreo}>
                            <input required type='text' placeholder='NUEVA CONTRASEÑA' className='inputCambiarContraseña' onChange={(e)=>{setDatos({...datos, contraseña:e.target.value})}}/>
                            <input required type='text' placeholder='CONFIRMAR CONTRASEÑA' className='inputCambiarContraseña2' onChange={(e)=>{setDatos({...datos, confirmarContraseña:e.target.value})}}/>
                            
                            <button type='submit' className='buttonCambiarContraseña'>Confirmar</button>
                            <div style={{display:'flex', height:70+ 'px', alignItems:'center', justifyContent:'center'}}>
                                <div id='signInDiv'></div>
                            </div>
                            
                        </form>

                    </div>
                </div>}

            {
                show ?
                    null :
                    <Footer />
            }

        </div>
    );
}

export default CambiarPassword;
