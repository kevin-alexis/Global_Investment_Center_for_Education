import React, { useEffect, useState } from 'react';
import Navbar from '../../components//Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Criptomonedas.css'
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';

const Criptomonedas = () => {

    const [show, setShow] = useState(false);
    const [rates, setRates] = useState([])
    const clases = ['rojo', 'verde', 'amarillo', 'morado', 'naranja', 'azul'];
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);

    const getCriptomonedas = () => {
        const url = "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0"

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a4d8f9ff3dmsh0c74da065d212d3p1e01e8jsn22eb760fa0c6',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        }

        fetch(url, options)
            .then(result => result.json())
            .then(data => {
                setRates(data.data.coins)
                setLoading(false);
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
        getCriptomonedas();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='Criptomonedas'>
            <Navbar show={show} setShow={setShow} />
            {show
                ?
                null
                :
                <div className='criptomonedasContainer'>
                    <div className='criptomonedasTitle'>
                        <h1 className='titleCriptomonedas'>Criptomonedas</h1>
                        <div>
                            <h1 className='titleDivisas' style={{ fontSize: 40, padding: 10, margin: 10 }}>
                                ¿Que son las criptomonedas?
                            </h1>
                            <div style={{paddingLeft:30, paddingRight:30}}>
                                
                            <p className='white-text' style={{ marginTop: 0, paddingTop: 0 , paddingBottom:0}}>Las criptomonedas son monedas digitales descentralizadas
                             que emplean criptografía y blockchain para garantizar transacciones seguras.</p> 
                            <p className='white-text' style={{ marginBottom: 0, paddingTop: 0 }}>El valor de las criptomonedas varía en función de la oferta, de la demanda, 
                            y del compromiso de los usuarios. Este valor se  forma  en  ausencia  de mecanismos  eficaces  que  impidan  su  manipulación, esto las hace muy seguras y utiles. </p>
                            </div>
                        </div>
                        {loading ? null : <h1 className='secondaryTitleCriptos'>Basado en: USD</h1>}
                    </div>
                    {loading ? (
                        <div className='loaderContainer'>
                            <BeatLoader color="purple" className='avisoCargando' />
                            <h2 style={{ color: 'purple', marginBottom: '100vh' }}>Cargando</h2>
                        </div>  // Muestra un mensaje de carga mientras los datos se están cargando
                    ) : (
                        <div className='cardsContainerCriptomonedas'>
                            {rates.slice(contador, contador + 6).map((currency, index) => {
                                // Usa el índice para seleccionar una clase del array
                                const clase = clases[index % clases.length];
                                const price = typeof currency.price === 'number' ? currency.price.toFixed(2) : parseFloat(currency.price).toFixed(2);
                                return (
                                    <div className={`cardCriptomonedas`} key={currency.uuid}>
                                        <p className={`titleCardDivisas ${clase}`}>{currency.name}</p>
                                        <h2 className='price'>$ {price}</h2>
                                        {/* toFixed se utilizó para reducir los decimales */}
                                    </div>
                                );
                            })}

                        </div>
                    )}
                    {loading ?
                        null
                        :
                        <div className='contadorCriptomonedas'>
                            {(contador > 1)
                                ? <img src={Izquierdo} className='NewsSiSirve' onClick={decrementarContador} />
                                : <img className='NewsNoSirve' src={Izquierdo} />
                            }


                            {(contador <= 45)
                                ? <img src={Derecho} className='NewsSiSirve' onClick={aumentarContador} />
                                : <img className='NewsNoSirve' src={Derecho} />
                            }
                        </div>

                    }

                </div>
            }
            {show
                ?
                null
                :
                <Footer />}
        </div>
    );
}

export default Criptomonedas;
