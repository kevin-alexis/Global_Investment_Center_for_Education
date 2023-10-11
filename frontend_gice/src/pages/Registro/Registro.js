import React, {useState, useTransition} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Registro.css"

const Login = () => {
    const [show, setShow] = useState(false);
    const [datos, setDatos] = useState({
        nombre:'',
        correo:'',
        contraseña:'',
        confirmarCOntraseña: ''
    });

    const register = (event) =>{
        event.preventDefault()

    }


    return (
        <div className='Login'>
            <div className='imageContainer'></div>
            <Navbar show={show} setShow={setShow}/>
            {show?
            null:
            <div className='loginContainer'>
                
                <div className='titleContainer'>
                
                    
                    <h1 className='titleLogin'>Registro</h1>
                </div>
                <div className='loginFormContainer'>
                    
                    <form className='loginForm' onSubmit={register}>
                        {/* <label>Usuario</label> */}
                        <input type='text' placeholder='NOMBRE' className='inputLogin' onChange={e => ({...setDatos, nombre:e.target.value})}/>
                        <input type='text' placeholder='CORREO' className='inputLogin' onChange={e => ({...setDatos, correo:e.target.value})}/>
                        {/* <label>Contraseña</label> */}
                        <input type='password' placeholder='CONTRASEÑA' className='inputLogin' onChange={e => ({...setDatos, contraseña:e.target.value})}/>
                        <input type='password' placeholder='REPETIR CONTRASEÑA' className='inputLogin' onChange={e => ({...setDatos, confirmarCOntraseña:e.target.value})}/>
                        <button type='submit' className='buttonLogin'>Registrarse</button>
                        <button type='submit' className='buttonLogin'>Registrarse con Google</button>
                    </form>

                </div>
            </div>}

            {
            show?
            null:
            <Footer/>
            }
            
        </div>
    );
}

export default Login;
