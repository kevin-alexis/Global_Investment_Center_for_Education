import React, { useState, useTransition, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import jwt_decode from 'jwt-decode';
import "./Registro.css"

const Registro = () => {

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
        correoElectronico: '',
        contraseña: '',
        confirmarContraseña: '',
        idTipoUsuarioId: 2
    });

    const register = (event) => {
        event.preventDefault();
        if(datos.contraseña === datos.confirmarContraseña){
            const URL = 'http://localhost:8080/usuarios';
    
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
            .then(response => response.json())
            .then(data => {console.log(data)})
            .catch((error)=>{
                console.log(error)
                // userNotFound.innerHTML = `<p class="userTextNotFound">Usuario no existente</p>`
              })
        }else{
            console.log(datos);
            console.log("Las contraseñas no coinciden");
        }
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
