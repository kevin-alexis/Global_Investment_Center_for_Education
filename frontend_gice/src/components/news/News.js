import './News.css'
import UniNew from '../UniNew/UniNew.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'

function News({loading, setLoading}) {

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
            try {
                let apiKey = '453fd047213746b9b3ec5f83342dcf7a'
                const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`)
                setNoticia(response.data.articles.filter((articles)=> !(articles.urlToImage == null)))
                setNum(response.data.articles.filter((articles)=> !(articles.urlToImage == null)).slice(primero, segundo))
                // console.log(noticia)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        getNoticias()


    }, [])

    useEffect(() => {
        setNum(noticia.slice(primero, segundo))
    }, [primero, segundo])




    return (
        loading ? (
            <h2 className='avisoCargando'>Cargando datos...</h2> // Muestra un mensaje de carga mientras los datos se están cargando
            ) :(<>
        
                <div className='NewsMargen'>
                    {num.map((news, index) => {
                        return (
                            <UniNew key={index} noticia={news} ></UniNew>)
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

