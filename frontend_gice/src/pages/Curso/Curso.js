import React, {useEffect, useState} from 'react';
import "./Curso.css"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"


const Curso = () => {

    const urlBackend = "http://localhost:8080/uploads/"
    const [cursos, setCursos] = useState([]);

    function obtenerCursos(){
        fetch("http://localhost:8080/cursos", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => setCursos(data))
        .catch((error) => console.error(error));
    }

    function descargarCurso(rutaDocumento) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rutaDocumento: rutaDocumento })
        };
    
        fetch('http://localhost:8080/cursos/descargar', requestOptions)
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(()=>{
        obtenerCursos();
    },[])

    const [show, setShow] = useState(false);
    return (
        <div className='Curso'>
            <Navbar show={show} setShow={setShow}/>
            {show?
            null:
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
                <div className='cardCursoContainer'>
                    {
                        cursos.map(curso => {
                            return(
                                <div key={curso.idCurso} className='cardCurso'>
                                    <div className='cardCursoImageContainer'>
                                        <img className='cardCursoImage' src={`${urlBackend}${curso.rutaImagen}`} alt="curso1"/>
                                    </div>
                                    <div className='cardCursoContent'>
                                        <div>
                                            <h2 className='titleCardCurso'>{curso.titulo}</h2>
                                            <p className='textCardCurso'>{curso.descripcion}</p>
                                        </div>
                                        <button onClick={()=>descargarCurso(curso.rutaDocumento)} className='buttonDownloadCurso'>Descargar PDF</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>

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
