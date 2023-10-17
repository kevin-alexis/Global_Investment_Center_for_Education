import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Login.css"
import jwt_decode from 'jwt-decode'

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

                        <form className='loginForm'>
                            {/* <label>Usuario</label> */}
                            <input type='text' placeholder='CORREO' className='inputLogin' />
                            {/* <label>Contraseña</label> */}
                            <input type='password' placeholder='CONTRASEÑA' className='inputLogin' />
                            <a href='' className='forgotPasswordLink'>OLVIDE MI CONTRASEÑA</a>
                            <button type='submit' className='buttonLogin'>Iniciar Sesión</button>
                            <div style={{display:'flex', height:70+ 'px', alignItems:'center', justifyContent:'center'}}>
                                <div id='signInDiv'></div>
                            </div>
                            <button type='submit' className='buttonRegister'>REGISTRARSE</button>
                            
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
