import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Navbar setShow={setShow} show={show}/>
            {show?
            null
            :<div className='layoutSectionsHome'>
                <div className='containerTitleHome'>
                    <div className='titleContainer'>
                        <div className='containerLineTitle'>
                            <h1 className='firstTitleLetter'>G</h1>
                            <p className='allTheTitle'>lobal</p>
                        </div>
                        <div className='containerLineTitle'>
                            <h1 className='firstTitleLetter'>I</h1>
                            <p className='allTheTitle'>nvestment</p>
                        </div>
                        <div className='containerLineTitle'>
                            <h1 className='firstTitleLetter'>C</h1>
                            <p className='allTheTitle'>enter for</p>
                        </div>
                        <div className='containerLineTitle'>
                            <h1 className='firstTitleLetter'>E</h1>
                            <p className='allTheTitle'>ducation</p>
                        </div>
                    </div>
                    <div className='ImagenLugarPila'>
                        <div className='blurContainer'></div>
                        <div className='containerImage'></div>
                    </div>
                </div>
                <div className='containerHome2'>
                    <h2 className='subtitle'>Comencemos.</h2>
                    <p className='text'>La educación financiera es un aspecto fundamental de la vida moderna que todos deberíamos abordar con seriedad. Implica aprender cómo gestionar nuestro dinero de manera efectiva, tomar decisiones financieras informadas y planificar nuestro futuro financiero.</p>
                </div>
                <div className='banner1Container'>
                    <h2 className='subtitle'>¿Para qué es útil saber sobre finanzas?</h2>
                    <p className='text'>Saber sobre finanzas es útil porque te permite tomar decisiones inteligentes con tu dinero, asegurar tu estabilidad financiera, planificar tu futuro, reducir deudas, invertir con sensatez y, en última instancia, mejorar tu calidad de vida.</p>
                </div>
                <div className='bannersContainer'>
                    <Link to="/noticias">
                        <div className='banner2Container'>
                            <div className='decoration'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="18" viewBox="0 0 82 18" fill="none">
                                <path d="M0 9C0 4.02944 4.02944 0 9 0H72.7927C77.7633 0 81.7927 4.02944 81.7927 9C81.7927 13.9706 77.7633 18 72.7927 18H9C4.02944 18 0 13.9706 0 9Z" fill="#9945FF"/>
                                </svg>
                            </div>
                            <div className='titleCard'>
                                <p className='text'>Noticias</p>
                                <button className='arrowButton'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 27 26" fill="none">
                                    <path d="M13.0161 25.5C19.9197 25.5 25.5161 19.9036 25.5161 13C25.5161 6.09644 19.9197 0.5 13.0161 0.5C6.11255 0.5 0.516113 6.09644 0.516113 13C0.516113 19.9036 6.11255 25.5 13.0161 25.5Z" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.0161 18L18.0161 13L13.0161 8" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.01611 13H18.0161" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Link>

                    <Link to="/curso">
                        <div className='banner3Container'>
                            <div className='decoration'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="18" viewBox="0 0 82 18" fill="none">
                                <path d="M0 9C0 4.02944 4.02944 0 9 0H72.7927C77.7633 0 81.7927 4.02944 81.7927 9C81.7927 13.9706 77.7633 18 72.7927 18H9C4.02944 18 0 13.9706 0 9Z" fill="#9945FF"/>
                                </svg>
                            </div>
                            <div className='titleCard'>
                                <p className='text'>Curso para principiantes</p>
                                <div className='arrowButton'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 27 26" fill="none">
                                    <path d="M13.0161 25.5C19.9197 25.5 25.5161 19.9036 25.5161 13C25.5161 6.09644 19.9197 0.5 13.0161 0.5C6.11255 0.5 0.516113 6.09644 0.516113 13C0.516113 19.9036 6.11255 25.5 13.0161 25.5Z" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.0161 18L18.0161 13L13.0161 8" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.01611 13H18.0161" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/divisas">
                        <div className='banner4Container'>
                            <div className='decoration'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="18" viewBox="0 0 82 18" fill="none">
                                <path d="M0 9C0 4.02944 4.02944 0 9 0H72.7927C77.7633 0 81.7927 4.02944 81.7927 9C81.7927 13.9706 77.7633 18 72.7927 18H9C4.02944 18 0 13.9706 0 9Z" fill="#9945FF"/>
                                </svg>
                            </div>
                            <div className='titleCard'>
                                <p className='text'>Divisas</p>
                                <div className='arrowButton'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 27 26" fill="none">
                                    <path d="M13.0161 25.5C19.9197 25.5 25.5161 19.9036 25.5161 13C25.5161 6.09644 19.9197 0.5 13.0161 0.5C6.11255 0.5 0.516113 6.09644 0.516113 13C0.516113 19.9036 6.11255 25.5 13.0161 25.5Z" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.0161 18L18.0161 13L13.0161 8" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8.01611 13H18.0161" stroke="#848895" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div> 
                    </Link>
                </div>
            </div>
            }
            {show ? 
            null:
            <Footer/>
            }
            
            
        </div>
    );
}

export default Home;
