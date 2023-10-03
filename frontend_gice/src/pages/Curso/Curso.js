import React from 'react';
import "./Curso.css"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"


const Curso = () => {
    return (
        <div className='Curso'>
            <Navbar/>
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
                    <div className='cardCurso'>
                        <div className='cardCursoImageContainer'>
                            <img className='cardCursoImage' src="https://ventana.ebc.mx/wp-content/uploads/2022/09/EBC_sep_blog_11_tasas_de_interes_de_que_forma_afecta_la_finanzas_personales_header.jpg" alt="curso1"/>
                        </div>
                        <div className='cardCursoContent'>
                            <div>
                                <h2 className='titleCardCurso'>¿Cuál es la importancia de saber finanzas en la vida cotidiana?</h2>
                                <p className='textCardCurso'>Acción de colocar capital o dinero en una actividad económica, proyecto u operación con el objetivo de obtener un rendimiento económico a largo plazo</p>

                            </div>
                            <a href='' className='buttonDownloadCurso' >Descargar</a>
                        </div>
                    </div>

                    
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default Curso;
