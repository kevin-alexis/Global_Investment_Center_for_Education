import './News.css'
import UniNew from '../UniNew/UniNew.js'
import { useEffect, useState } from 'react'
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'
import { BeatLoader } from 'react-spinners';

function News({ loading, setLoading }) {
    const [noticia, setNoticia] = useState([])
    const [primero, setPrimero] = useState(0)
    const [segundo, setSegundo] = useState(6)
    const [pagina, setPagina] = useState(1)
    const [num, setNum] = useState([])


    const sumandoMostrar = () => {
        setPagina(pagina + 1)
        setPrimero(primero + 6)
        setSegundo(segundo + 6)

    }

    const restandoMostrar = () => {
        setPagina(pagina - 1)
        setPrimero(primero - 6)
        setSegundo(segundo - 6)
    }


    useEffect(() => {
    const getNoticias = async (prim, segu) => {
        let apiKey = '453fd047213746b9b3ec5f83342dcf7a';

        fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.articles && Array.isArray(data.articles)) {
                    const filteredArticles = data.articles.filter(article => {
                        // Utiliza una expresión regular para detectar URLs en el campo de descripción
                        const urlRegex = /(http(s)?:\/\/[^\s]+)/g;
                        return (
                            article.source &&
                            article.description &&
                            article.source.id &&
                            article.source.name &&
                            article.author &&
                            article.title &&
                            !urlRegex.test(article.description) && // Verificar si la descripción contiene una URL
                            article.url &&
                            article.urlToImage &&
                            article.publishedAt &&
                            article.content
                        );
                    });

                    if (filteredArticles.length > 0) {
                        setNoticia(filteredArticles);
                        setNum(filteredArticles.slice(primero, segundo));
                        console.log(filteredArticles);
                        setLoading(false);
                    } else {
                        console.log('No se encontraron noticias con descripciones textuales.');
                        setLoading(false);
                    }
                } else {
                    console.log('La respuesta del API no tiene el formato esperado.');
                    setLoading(false);
                }
            })
            .catch(error => console.log(error));
    };

    getNoticias();
}, []);

    
    

    useEffect(() => {
        setNum(noticia.slice(primero, segundo))
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [primero, segundo])




    return (
        loading ? (
            <div className='loaderContainer'>
                <BeatLoader color="purple" className='avisoCargando'/>
                <h2 style={{color:'purple', marginBottom:'100vh'}}>Cargando</h2>
            </div>

        ) : (<>

            <div className='NewsMargen'>
                {num.map((news, index) => {
                    return (
                        <UniNew key={index} noticia={news}></UniNew>)
                })
                }
            </div>

            {(pagina > 1)
                ? <img src={Izquierdo} className='NewsSiSirve' onClick={restandoMostrar} />
                : <img className='NewsNoSirve' src={Izquierdo} />
            }


            {(pagina <= 10)
                ? <img src={Derecho} className='NewsSiSirve' onClick={sumandoMostrar} />
                : <img className='NewsNoSirve' src={Derecho} />
            }

        </>)

    )
}

export default News

