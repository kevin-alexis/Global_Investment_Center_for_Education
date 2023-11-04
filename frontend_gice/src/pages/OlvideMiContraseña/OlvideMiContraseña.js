import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./OlvideMiContraseña.css"
import Swal from 'sweetalert2';

const OlvideMiContraseña = () => {

    const GICE_API = process.env.REACT_APP_URL_API;


    const [datos, setDatos] = useState({
        correoElectronico:''
    })
    

    const enviarCorreo = (e) => {
        e.preventDefault();
        const URL = `${GICE_API}/recuperar-cuenta`;
    
        // Fetch options
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        };
    
        // const userNotFound = document.getElementById('userNotFound');
    
        // Fetch request
        fetch(URL, requestOptions)
            .then(response => {
                if (response.ok) {
                    // Si la respuesta es exitosa, muestra una alerta de éxito y redirige al usuario a la página '/dashboard'
                    Swal.fire({
                        title: 'Correo enviado',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/';
                    });
                } else {
                    // Si la respuesta no es exitosa, muestra una alerta de error
                    Swal.fire({
                        title: 'Error',
                        text: 'Usuario no existente',
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
    };

    const [show, setShow] = useState(false);
    return (
        <div className='OlvideMiContraseña'>
            <div className='imageContainer'></div>
            <Navbar show={show} setShow={setShow} />
            {show ?
                null :
                <div className='OlvideMiContraseñaContainer'>
                    <div className='titleContainer'>
                        <h1 className='titleOlvideMiContraseña'>Olvide mi Contraseña</h1>
                    </div>
                    <div className='OlvideMiContraseñaFormContainer'>
                    <p className='IngCorreo'>INGRESA EL CORREO DE LA CUENTA A RECUPERAR</p>

                        <form className='OlvideMiContraseñaForm' onSubmit={enviarCorreo}>
                            <input required type='email' placeholder='CORREO' className='inputOlvideMiContraseña' onChange={(e)=>{setDatos({...datos, correoElectronico:e.target.value})}}/>
                            
                            <button type='submit' className='buttonOlvideMiContraseña'>Confirmar</button>
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

export default OlvideMiContraseña;
