import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./CambiarContraseña.css"
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';

const CambiarPassword  = () => {

    const GICE_API = process.env.REACT_APP_URL_API;

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

        if(!datos.contraseña.trim() || !datos.confirmarContraseña.trim()){
            Swal.fire({
                title: 'Error',
                text: 'Datos invalidos. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return
        }

        if (datos.contraseña.length < 8 || !/[0-9]/.test(datos.contraseña) || !/[A-Z]/.test(datos.contraseña) || !/[!@#$%^&*_-]/.test(datos.contraseña)) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula y un carácter especial.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        if(datos.contraseña === datos.confirmarContraseña){
            const URL = `${GICE_API}/cambiar-password?token=${token}&&idUsuario=${idUsuario}`;

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
                        title: '¡Oops!',
                        text: 'Lo sentimos, parece que hubo un problema y el token ha expirado. Por favor, solicita otro token para continuar.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch((error) => {
                // Si hay un error de red, muestra una alerta de error
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
                            <input required type='password' placeholder='NUEVA CONTRASEÑA' className='inputCambiarContraseña' onChange={(e)=>{setDatos({...datos, contraseña:e.target.value})}}/>
                            <input required type='password' placeholder='CONFIRMAR CONTRASEÑA' className='inputCambiarContraseña2' onChange={(e)=>{setDatos({...datos, confirmarContraseña:e.target.value})}}/>
                            
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
