import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import "./Divisas.css"

const Divisas = () => {

    const [rates, setRates] = useState([])

    const fetchExchangeRates = async () => {
        const valorMonedaBase = 'MXN';
        const url = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/' + valorMonedaBase;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a4d8f9ff3dmsh0c74da065d212d3p1e01e8jsn22eb760fa0c6',
                'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setRates(result); // Guardar los resultados en el estado
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExchangeRates(); // Llamada a la API al cargar el componente
    }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente


    return (
        <div className='Divisas'>
            <Navbar/>
            <div className='divisasContainer'>
                <div className='divisasTitle'>
                    <div className='imageContainerDivisas'>

                    </div>
                    <div>
                        <h1 className='titleDivisas'>Divisas</h1>
                        <p className='white-text'>¿Y si me arriesgo y pierdo...? ¿Y si te arriesgas y ganas?</p>
                    </div>
                </div>
                <div>
                    <h1 className='secondaryTitle'>Basado en: MXN</h1>
                    <div className='cardsContainerDivisas'>
                        <div className='cardDivisas'>
                            <p className='titleCardDivisas azul'>Dolar Estadounidense</p>
                            <h2 className='price'>$50.86</h2>
                        </div>
                    </div>
                </div>
                <div className='bottomBannerDivisas'>
                    <p className='textBottomBannerDivisas'>“No esperes el momento preciso en el que el mercado esté listo para invertir. Empieza ahora. El mejor momento para sembrar un roble fue hace 20 años. El segundo mejor momento es ahora”</p>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}

export default Divisas;
