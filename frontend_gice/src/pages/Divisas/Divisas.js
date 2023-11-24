import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Divisas.css"
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';

const Divisas = () => {

    const [show, setShow] = useState(false);
    const [rates, setRates] = useState([])
    const clases = ['rojo', 'verde', 'amarillo', 'morado', 'naranja', 'azul'];
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);

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
        fetchExchangeRates("MXN"); // Llamada a la API al cargar el componente
        window.scrollTo(0, 0);
    }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente


    function changeCurrency(event) {
        const divisa = event.target.value;
        fetchExchangeRates(divisa);
    }

    return (
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
                            <div>
                                <h1 className='titleDivisas' style={{ fontSize: 40, padding: 10, margin: 10 }}>
                                    ¿Para que nos sirve saber sobre la moneda?
                                </h1>
                                <div style={{paddingLeft:30, paddingRight:30}}>
                                <p className='white-text' style={{ marginBottom: 0, paddingBottom: 0, paddingTop:0}}>Saber el precio de una moneda es fundamental para aquellos interesados en invertir,
                                    ya sea en criptomonedas o monedas fiat.  </p>
                                <p className='white-text' style={{ marginTop: 0, paddingTop: 0}}>Este conocimiento permite tomar decisiones informadas sobre el momento adecuado para
                                    comprar o vender, considerando factores como la oferta y la demanda, eventos económicos y noticias geopolíticas. Además, seguir los
                                    precios ayuda a identificar tendencias del mercado y a evaluar el rendimiento de la cartera de inversiones.</p>
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
