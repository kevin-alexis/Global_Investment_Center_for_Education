import React, {useEffect, useState} from 'react';
import "./Curso.css"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';


const Curso = () => {

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);
    const GICE_API = process.env.REACT_APP_URL_API;


    function obtenerCursos(){
        fetch(`${GICE_API}/cursos`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setCursos(data)
            setLoading(false); 
        })
        .catch((error) => console.error(error));
    }

    function descargarCurso(rutaDocumento,idCurso) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rutaDocumento: rutaDocumento })
        };
    
        fetch(`${GICE_API}/cursos/descargar`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                let nombreArchivo = rutaDocumento;
                let partes = nombreArchivo.split("-");
                let nuevoNombre = partes.slice(1).join("-"); // Toma las partes desde la segunda posición y las une con "-"
                a.download = nuevoNombre;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                addDownload(idCurso);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function addDownload(id){
        const url=`${GICE_API}/cursos/actualizar-descarga`;
        const options={
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({ idCurso: id })
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    function aumentarContador(){
        setContador(contador + 5);
        scrollToTop()
    }

    function decrementarContador(){
        setContador(contador - 5);
        scrollToTop()
    }

    useEffect(()=>{
        obtenerCursos();
        window.scrollTo(0,0);
    },[])

    function scrollToTop() {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }

    const [show, setShow] = useState(false);
    return (
        <div className='Curso'>
            <Navbar show={show} setShow={setShow}/>
            {show?
            null
            :
            <div className='cursoContainer'>
                {
                    loading?
                    <div className='loaderContainer'>
                        <BeatLoader color="purple" className='avisoCargando'/>
                        <h2 style={{color:'purple', marginBottom:'100vh'}}>Cargando</h2>
                    </div>  // Muestra un mensaje de carga mientras los datos se están cargando
                    :
                    <div className='cursoContainer'>
                        <div className='titleCursoContainer'>
                            <div>
                                <h1 className='titleCurso'>Curso para principiantes</h1>
                                <p className='subtitleCurso'>GLOBAL INVESTMENT CENTER FOR EDUCATION</p>
                            </div>
                            <div>
                                <p className='textCurso'>“La inversión no se trata de predecir el futuro, sino de estar preparado para él.”</p>
                            </div>
                        </div>

                        <div>
                    <h1 className='titleDivisas' style={{fontSize:40, padding:10, margin:10}}>
                        BIENVENIDOS AL CURSO DE 
                    </h1>
                    <h1 className='titleDivisas' style={{fontSize:60, padding:0, margin:0}}>
                        GICE
                    </h1>
                    
                    <p className='white-text' style={{marginBottom:0, paddingTop:0, paddingBottom:20+'vh'}}>Este curso esta enfocado para aquellas personas
                     desean invertir, pero carecen de conocimientos financieros. Este curso busca enseñar las bases para poder iniciar y mas adelante ir haciendo tus propias
                     inversiones y hacer que crezca tu dinero.
                    </p>
                    
                </div>

                        <div className='cardCursoContainer'>
                        {
                            cursos.length > 0 ?
                            cursos.slice(contador, contador + 5).map((curso) => {
                                return (
                                    <div key={curso.idCurso} className='cardCurso'>
                                        <div className='cardCursoImageContainer'>
                                            <img className='cardCursoImage' src={`${GICE_API}/${curso.rutaImagen}`} alt={`curso-${curso.idCurso}`} />
                                        </div>
                                        <div className='cardCursoContent'>
                                            <div>
                                                <h2 className='titleCardCurso'>{curso.titulo}</h2>
                                                <p className='textCardCurso'>{curso.descripcion}</p>
                                            </div>
                                            <button onClick={() => descargarCurso(curso.rutaDocumento, curso.idCurso)} className='buttonDownloadCurso'>Descargar PDF</button>
                                        </div>
                                    </div>
                                );
                            })
                            :
                            null
                        }
                            {loading?
                            null
                            :
                            <div className='contadorCriptomonedas'>
                                {(contador > 1)
                                ? <img src={Izquierdo} className='NewsSiSirve' onClick={decrementarContador} />
                                : <img className='NewsNoSirve' src={Izquierdo} />
                                }
        
        
                                {(contador + 5 <= cursos.length)
                                    ? <img src={Derecho} className='NewsSiSirve' onClick={aumentarContador} />
                                    : <img className='NewsNoSirve' src={Derecho} />
                                }
                            </div>
        
                        }
                            
                        </div>
        
                    </div>
                }
            </div>            
            }
            {show?
            null:
            <Footer/>
            }
            
            
        </div>
    );
}

export default Curso;
