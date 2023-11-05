import React, {useEffect, useState} from 'react';
import "./Curso.css"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"


const Curso = () => {

    const [cursos, setCursos] = useState([]);
    const GICE_API = process.env.REACT_APP_URL_API;


    function obtenerCursos(){
        fetch(`${GICE_API}/cursos`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => setCursos(data))
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

    useEffect(()=>{
        obtenerCursos();
        window.scrollTo(0,0);
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
                        cursos.length > 0 ?
                        cursos.map(curso => {
                            return(
                                <div key={curso.idCurso} className='cardCurso'>
                                    <div className='cardCursoImageContainer'>
                                        <img className='cardCursoImage' src={`${GICE_API}/${curso.rutaImagen}`} alt="curso1"/>
                                    </div>
                                    <div className='cardCursoContent'>
                                        <div>
                                            <h2 className='titleCardCurso'>{curso.titulo}</h2>
                                            <p className='textCardCurso'>{curso.descripcion}</p>
                                        </div>
                                        <button onClick={()=>descargarCurso(curso.rutaDocumento, curso.idCurso)} className='buttonDownloadCurso'>Descargar PDF</button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
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
