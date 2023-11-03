import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Login.css"
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

const Login = () => {

    const [datos, setDatos] = useState({
        correoElectronico:'',
        contraseña: ''
    })

    const iniciarSesion = (e) => {
        e.preventDefault();
        const URL = 'http://localhost:8080/iniciar-sesion';
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        };

        const userNotFound = document.getElementById('userNotFound');
    
        // Fetch request
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data.user[0].token);
                localStorage.setItem('auth', "yes")
                localStorage.setItem('sesion_token', data.token)
                localStorage.setItem('user_token', data.user[0].token)
                if(data.user[0].rol=='user'){ // USUARIO
                    window.location.href = '/';
                }else if(data.user[0].rol=='admin'){ //ADMIN
                    window.location.href = '/dashboard';
                }
            })
            .catch((error)=>{
                console.log(error)
                userNotFound.innerHTML = `<p class="userTextNotFound">Usuario no existente</p>`
            })
    };

    // Google Login 
    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID token: ' + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(jwt_decode(response.credential))
    }

    useEffect(() => {
        
        /* global google*/
        google.accounts.id.initialize({
            client_id: '990331222556-dv2o8bfq96mcir6ac91ohene0qg34v69.apps.googleusercontent.com',
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { size: 'large', shape:'pill' }
        )

    }, [])

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
