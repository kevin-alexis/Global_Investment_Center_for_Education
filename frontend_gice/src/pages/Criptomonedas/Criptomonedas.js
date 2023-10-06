import React, {useEffect, useState} from 'react';
import Navbar from '../../components//Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Criptomonedas.css'
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'

const Criptomonedas = () => {

    const [rates, setRates] = useState([])
    const clases = ['rojo', 'verde', 'amarillo', 'morado', 'naranja', 'azul'];
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);

    const getCriptomonedas = () =>{
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
        .catch(error=>console.log(error))
    }

    function aumentarContador(){
        setContador(contador + 6);
    }

    function decrementarContador(){
        setContador(contador - 6);
    }

    useEffect(() => {
        getCriptomonedas()
    },[])

    return (
        <div className='Criptomonedas'>
            <Navbar/>
            <div className='criptomonedasContainer'>
                <div className='criptomonedasTitle'>
                    <h1 className='titleCriptomonedas'>Criptomonedas</h1>
                    {loading ? null : <h1 className='secondaryTitleCriptos'>Basado en: USD</h1>}
                </div>
                {loading ? (
                <h2 className='avisoCargando'>Cargando datos...</h2> // Muestra un mensaje de carga mientras los datos se están cargando
                ) : (
                    <div className='cardsContainerCriptomonedas'>
                        {/* <h1>Card</h1> */}
                        {rates.slice(contador, contador+6).map((currency, index) => {
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
                {loading?
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
            
            
            <Footer/>
        </div>
    );
}

export default Criptomonedas;
