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
        // console.log(pagina)
        setPrimero(primero + 6)
        setSegundo(segundo + 6)

    }

    const restandoMostrar = () => {
        setPagina(pagina - 1)
        // console.log(pagina)
        setPrimero(primero - 6)
        setSegundo(segundo - 6)
    }


    useEffect(() => {

        const getNoticias = async (prim, segu) => {

            let apiKey = '453fd047213746b9b3ec5f83342dcf7a'

                fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        setNoticia(data.articles.filter((articles) => !(articles.urlToImage == null)))
                        setNum(data.articles.filter((articles) => !(articles.urlToImage == null)).slice(primero, segundo))
                        // console.log(noticia)
                        setLoading(false);
                    }).catch(error => console.log(error))
        }

        getNoticias()

    }, [])

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
            {/* <div className='NewsMargen'>
            {
            num
                .filter(noticia => noticia.title && noticia.description && noticia.urlToImage && noticia.title.length < 100)
                .map((news, index) => {
                    return <UniNew key={index} noticia={news}></UniNew>;
                })}
        </div> */}

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

