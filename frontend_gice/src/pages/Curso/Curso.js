import React, {useEffect, useState} from 'react';
import "./Curso.css"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';
import { FaTimes } from 'react-icons/fa'; 


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

    const [showPdfModal, setShowPdfModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [abrirImgPdf, setAbrirImgPdf] = useState(false)


    function PDFModal({ rutaPdf, closeModal }) {
        return (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal">
                    <div className="modal-close">
                        <FaTimes onClick={closeModal} color='black' fontSize="30px"/>
                    </div>
                    <iframe src={rutaPdf} className="pdf-modal-content" title="PDF Modal"/>
                </div>
            </div>
        );
    }

    function closeModal() {
        setShowPdfModal(false);
        setShowImageModal(false);
        setAbrirImgPdf(false);
    }

    function FuncVerPDF(rutaPdf) {
        setPdfUrl(`${GICE_API}/${rutaPdf}`);
        setShowPdfModal(true);
        setAbrirImgPdf(true);
    }


    const [show, setShow] = useState(false);
    return (
        
            abrirImgPdf?
                <>
                    {showPdfModal && <PDFModal rutaPdf={pdfUrl} closeModal={closeModal} />}
                </>
            :
        
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
                                <div>
                                    <p className='textCurso'>
                                    Bienvenido al curso de finanzas. Aquí nos sumergiremos en el mundo de las inversiones. Aprenderás los conceptos básicos para que puedas comenzar a invertir. Te llevaremos de la mano para entender cómo funciona este universo financiero. Exploraremos conceptos, entenderemos el riesgo y aprenderemos cómo sacarles provecho. ¡Prepárate para descubrir cómo convertir el dinero en tu aliado para alcanzar tus metas!                                   
                                    </p>
                                </div>
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
                                                <div className='buttonContainer'>
                                                    <button onClick={()=>FuncVerPDF(curso.rutaDocumento)} className='buttonDownloadCurso'>Vista previa PDF</button>
                                                    <button onClick={() => descargarCurso(curso.rutaDocumento, curso.idCurso)} className='buttonDownloadCurso resaltButton'>Descargar PDF</button>
                                                </div>
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
