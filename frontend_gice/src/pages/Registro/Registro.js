import React, { useState, useTransition, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import jwt_decode from 'jwt-decode';
import "./Registro.css"

const Login = () => {

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
            { size: 'large', shape: 'pill' }
        )

    }, [])


    const [show, setShow] = useState(false);
    const [datos, setDatos] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarCOntraseña: ''
    });

    const register = (event) => {
        event.preventDefault()

    }


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
                            {/* <label>Usuario</label> */}
                            <input type='text' placeholder='NOMBRE' className='inputLogin' onChange={e => ({ ...setDatos, nombre: e.target.value })} />
                            <input type='text' placeholder='CORREO' className='inputLogin' onChange={e => ({ ...setDatos, correo: e.target.value })} />
                            {/* <label>Contraseña</label> */}
                            <input type='password' placeholder='CONTRASEÑA' className='inputLogin' onChange={e => ({ ...setDatos, contraseña: e.target.value })} />
                            <input type='password' placeholder='REPETIR CONTRASEÑA' className='inputLogin' onChange={e => ({ ...setDatos, confirmarCOntraseña: e.target.value })} />
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

export default Login;
