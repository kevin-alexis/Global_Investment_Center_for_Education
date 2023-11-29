import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Divisas.css"
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';
import { FaTimes } from 'react-icons/fa'; 

const Divisas = () => {

    const [show, setShow] = useState(false);
    const [rates, setRates] = useState([])
    const clases = ['rojo', 'verde', 'amarillo', 'morado', 'naranja', 'azul'];
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);
    const divisasAcronimos = `http://localhost:3000/catalogo_monedas.pdf`

    const fetchExchangeRates = async (divisa) => {
        const valorMonedaBase = divisa;
        const url = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/' + valorMonedaBase;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a4d8f9ff3dmsh0c74da065d212d3p1e01e8jsn22eb760fa0c6',
                'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
            },
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                setRates(data.rates)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    function aumentarContador() {
        setContador(contador + 6);
    }

    function decrementarContador() {
        setContador(contador - 6);
    }

    useEffect(() => {
        fetchExchangeRates("MXN");
        window.scrollTo(0, 0);
    }, []);


    function changeCurrency(event) {
        const divisa = event.target.value;
        fetchExchangeRates(divisa);
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

    function FuncVerPDF() {
        setPdfUrl(divisasAcronimos);
        setShowPdfModal(true);
        setAbrirImgPdf(true);
    }


    return (
        abrirImgPdf?
                <>
                    {showPdfModal && <PDFModal rutaPdf={pdfUrl} closeModal={closeModal} />}
                </>
            :
    
        <div className='Divisas'>
            <Navbar show={show} setShow={setShow} />
            {show ?
                null :
                <div className='divisasContainer'>
                    <div className='divisasTitle'>
                        <div className='imageContainerDivisas'>

                        </div>
                        <div>
                            <h1 className='titleDivisas'>Divisas</h1>
                            <p className='white-text'>¿Y si me arriesgo y pierdo...? ¿Y si te arriesgas y ganas?</p>
                        </div>
                    </div>

                    {loading ?

                        <div className='loaderContainer'>

                            <BeatLoader color="purple" className='avisoCargando' />
                            <h2 style={{ color: 'purple', marginBottom: '100vh' }}>Cargando</h2>
                        </div>
                        :
                        <div className='divisasContentContainer'>
                            <div className='bannerDivisasIntro'>
                                <h1 className='titleDivisas' style={{ fontSize: 40, padding: 10, margin: 10 }}>
                                    ¿Qué son las divisas?
                                </h1>
                                <p className='textoIntroductorio' style={{ marginBottom: 0, paddingBottom: 0 }}>
                                Las divisas son monedas extranjeras que se utilizan en un país diferente al de su origen. Se intercambian en el mercado monetario mundial para realizar transacciones comerciales, inversiones y pagos de deudas. El precio de las divisas fluctúa respecto a otras divisas, estableciendo distintos tipos de cambio. El tipo de cambio es la cantidad de dinero de una moneda que equivale a una unidad de otra divisa. 
                                </p>
                                <br></br>

                                <p className='textoIntroductorio' style={{ marginTop: 0, paddingTop: 0 }}>
                                Las divisas son emitidas y reguladas por los gobiernos de cada país. Cada país tiene su propia divisa, que se reconoce por su acrónimo de tres letras. Las dos primeras letras corresponden al nombre del país y la tercera a la divisa. Por ejemplo, AUD se refiere al dólar australiano. 
                                </p>
                                <br></br>
                                <p className='textoIntroductorio' style={{ marginTop: 0, paddingTop: 0}}>
                                A continuación, encontrarás la lista completa de todas las divisas disponibles. Además, te recomendamos revisar el siguiente PDF para obtener más información acerca de los acrónimos utilizados.
                                </p>
                                <div className='buttonContainerDivisas'>
                                    <button onClick={()=>FuncVerPDF()} className='buttonDownloadCurso resaltButton' style={{fontWeight:"bold", fontSize:"30px"}}>Visualizar PDF</button>
                                </div>

                            </div>
                            <div className='selectDivisasContainer'>
                                <h1 className='secondaryTitle'>Basado en: </h1>
                                <select className='selectDivisas secondaryTitle' onChange={changeCurrency} disabled={loading}>
                                    {Object.keys(rates).map(currency => (
                                        <option value={currency} key={`option${currency}`}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='cardsContainerDivisas'>
                                {Object.keys(rates).slice(contador, contador + 6).map((currency, index) => {
                                    // Usa el índice para seleccionar una clase del array
                                    const clase = clases[index % clases.length];
                                    return (
                                        <div className={`cardDivisas`} key={currency}>
                                            <p className={`titleCardDivisas ${clase}`}>{currency}</p>
                                            <h2 className='price'>$ {rates[currency].toFixed(2)}</h2>
                                            {/* toFixed se utilizó para reducir los decimales */}
                                        </div>
                                    );
                                })}


                            </div>
                            <div className='contadorDivisas'>
                                {(contador > 1)
                                    ? <img src={Izquierdo} className='NewsSiSirve' onClick={decrementarContador} alt='boton izquierdo' />
                                    : <img className='NewsNoSirve' src={Izquierdo} alt='boton izquierdo sin click' />
                                }


                                {(contador <= 150)
                                    ? <img src={Derecho} className='NewsSiSirve' onClick={aumentarContador} alt='boton derecho' />
                                    : <img className='NewsNoSirve' src={Derecho} alt='boton derecho sin click' />
                                }
                            </div>

                        </div>
                    }

                    <div className='bottomBannerDivisas'>
                        <p className='textBottomBannerDivisas'>“No esperes el momento preciso en el que el mercado esté listo para invertir. Empieza ahora. El mejor momento para sembrar un roble fue hace 20 años. El segundo mejor momento es ahora”</p>
                    </div>
                </div>
            }
            {show ?
                null :
                <Footer />
            }



        </div>
    );
}

export default Divisas;
