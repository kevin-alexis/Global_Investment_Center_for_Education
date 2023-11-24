import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Login.css"
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Login = () => {

    const GICE_API = process.env.REACT_APP_URL_API;

    const [datos, setDatos] = useState({
        correoElectronico:'',
        contraseña: '',
    })

    const iniciarSesion = (e) => {
        e.preventDefault();
        const URL = `${GICE_API}/iniciar-sesion`;
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        };

        const userNotFound = document.getElementById('userNotFound');
    
        fetch(URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.token && data.user && data.user[0] && data.user[0].token) {
                localStorage.setItem('auth', "yes");
                localStorage.setItem('sesion_token', data.token);
                localStorage.setItem('user_token', data.user[0].token);
                
                if (data.user[0].rol === 'user') {
                    window.location.href = '/';
                } else if (data.user[0].rol === 'admin') {
                    window.location.href = '/dashboard';
                }
            } else {
                if (data.message === "Contraseña incorrecta") {
                    Swal.fire({
                        title: 'Error',
                        text: 'La contraseña es incorrecta.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else if (data.message === "Este correo está vinculado a una cuenta de Google") {
                    Swal.fire({
                        title: 'Advertencia',
                        text: 'El correo está vinculado a una cuenta de Google. Por favor, usa el inicio de sesión de Google.',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                } else if (data.message === "El usuario no existe") {
                    Swal.fire({
                        title: 'Error',
                        text: 'El usuario no existe.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Revisa los datos ingresados.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });


    };

    const [googleData, setGoogleData] = useState({
        correoElectronico:'',
        token: '',
    })

    const iniciarSesionGoogle = () => {
        const URL = `${GICE_API}/iniciar-sesion-google`;
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(googleData)
        };

        const userNotFound = document.getElementById('userNotFound');
    
        // Fetch request
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('auth', "yes")
                localStorage.setItem('sesion_token', data.token)
                localStorage.setItem('user_token', data.token)
                window.location.href = '/';
            })
            .catch((error)=>{
                console.log(error)
                userNotFound.innerHTML = `<p class="userTextNotFound">Usuario no existente</p>`
            })

    }

    // Google Login 
    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID token: ' + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(jwt_decode(response.credential))
        setGoogleData({ 
            ...googleData,
            correoElectronico: userObject.email,
            token: userObject.sub
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
            { size: 'large', shape:'pill', width:'300px' }
        )

        if (googleData.correoElectronico && googleData.token) {
            iniciarSesionGoogle();
        }

    }, [googleData])

    const [show, setShow] = useState(false);
    return (
        <div className='Login'>
            <div className='imageContainer'></div>
            <Navbar show={show} setShow={setShow} />
            {show ?
                null :
                <div className='loginContainer'>
                    <div className='titleContainer'>
                        <h1 className='titleLogin'>Iniciar Sesión</h1>
                        <p className='white-text' style={{padding:0, margin:0, fontSize:20 + 'px'}}>Si es su primera vez favor de registrarse para acceder a los cursos</p>
                    </div>
                    <div className='loginFormContainer'>

                        <form className='loginForm' onSubmit={iniciarSesion}>
                            <input required type='email' placeholder='CORREO' className='inputLogin' onChange={(e)=>{setDatos({...datos, correoElectronico:e.target.value})}}/>
                            <input required type='password' placeholder='CONTRASEÑA' className='inputLogin' onChange={(e)=>{setDatos({...datos, contraseña:e.target.value})}}/>
                            <div id='userNotFound'>

                            </div>
                            <a href='/olvide-contraseña' className='forgotPasswordLink'>OLVIDE MI CONTRASEÑA</a>
                            
                            <button type='submit' className='buttonLogin'>Iniciar Sesión</button>
                            <div style={{display:'flex', height:70+ 'px', alignItems:'center', justifyContent:'center'}}>
                                <div id='signInDiv'></div>
                            </div>
                            <Link to='/registro' className='buttonRegister'>REGISTRARSE</Link>
                            
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

export default Login;
