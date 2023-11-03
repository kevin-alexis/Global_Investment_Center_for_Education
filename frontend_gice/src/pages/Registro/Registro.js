import React, { useState, useTransition, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import jwt_decode from 'jwt-decode';
import "./Registro.css"
import Swal from 'sweetalert2';


const Registro = () => {

    const GICE_API = process.env.REACT_APP_URL_API;

    const [googleData, setGoogleData] = useState({
        nombre: '',
        correoElectronico:'',
        token: '',
        idTipoUsuarioId: 2
    })

    function handleCallbackResponse(response) {
        // console.log('Encoded JWT ID token: ' + response.credential)
        let userObject = jwt_decode(response.credential)
        // console.log(jwt_decode(response.credential))
        setGoogleData({...googleData,
            nombre: userObject.name,
            correoElectronico: userObject.email,
            token: userObject.sub
        })
    }

    const googleRegister = () => {
        const URL = `${GICE_API}/usuarios-google`;

        // Fetch options
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(googleData)
        };

        // Fetch request
        fetch(URL, requestOptions)
        .then(response => {
            if (response.ok) {
                // Mostrar SweetAlert2 de éxito
                Swal.fire({
                    title: 'Registro Exitoso',
                    text: '¡Bienvenido! Tu cuenta ha sido creada exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = '/login';
                });
            } else {
                // Si la respuesta no es exitosa, muestra una alerta de error
                Swal.fire({
                    title: 'Error',
                    text: 'Ya hay una cuenta con ese correo.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        })
    }


    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: '990331222556-dv2o8bfq96mcir6ac91ohene0qg34v69.apps.googleusercontent.com',
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { size: 'large', shape: 'pill' }
        )

        if (googleData.nombre && googleData.correoElectronico && googleData.token) {
            googleRegister();
        }

    }, [googleData])

    const [show, setShow] = useState(false);
    const [datos, setDatos] = useState({
        nombre: '',
        correoElectronico: '',
        contraseña: '',
        confirmarContraseña: '',
        idTipoUsuarioId: 2
    });

    

    const register = (event) => {
        event.preventDefault();
        if (datos.contraseña === datos.confirmarContraseña) {
            const URL = `${GICE_API}/usuarios`;
    
            // Fetch options
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            };
    
            // Fetch request
            fetch(URL, requestOptions)
            .then(response => {
                if (response.ok) {
                    // Mostrar SweetAlert2 de éxito
                    Swal.fire({
                        title: 'Registro Exitoso',
                        text: '¡Bienvenido! Tu cuenta ha sido creada exitosamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/login';
                    });
                } else {
                    // Si la respuesta no es exitosa, muestra una alerta de error
                    Swal.fire({
                        title: 'Error',
                        text: 'Ya hay una cuenta con ese correo.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
        } else {
            // Mostrar SweetAlert2 de error cuando las contraseñas no coinciden
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    


    return (
        <div className='Login'>
            <div className='imageContainer'></div>
            <Navbar style={{ position: 'absolute' }} show={show} setShow={setShow} />
            {show ?
                null :
                <div className='loginContainer'>

                    <div className='titleContainer'>


                        <h1 className='titleLogin'>Registro</h1>
                    </div>
                    <div className='loginFormContainer'>

                        <form className='loginForm' onSubmit={register}>
                            <input required type='text' placeholder='NOMBRE' className='inputLogin' onChange={e => (setDatos({ ...datos, nombre: e.target.value }))} />
                            <input required type='email' placeholder='CORREO' className='inputLogin' onChange={e => (setDatos({ ...datos, correoElectronico: e.target.value }))} />
                            <input required type='password' placeholder='CONTRASEÑA' className='inputLogin' onChange={e => (setDatos({ ...datos, contraseña: e.target.value }))} />
                            <input required type='password' placeholder='REPETIR CONTRASEÑA' className='inputLogin' onChange={e => (setDatos({ ...datos, confirmarContraseña: e.target.value }))} />
                            <div style={{ display: 'flex', height: 70 + 'px', alignItems: 'center', justifyContent: 'center' }}>
                                <div id='signInDiv'></div>
                            </div>
                            <button type='submit' className='buttonLogin'>Registrarse</button>
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

export default Registro;
