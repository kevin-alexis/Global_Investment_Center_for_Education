import './News.css'
import UniNew from '../UniNew/UniNew.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Izquierdo from '../../assets/Izquierdo.png'
import Derecho from '../../assets/Derecho.png'

function News() {

    const [noticia, setNoticia] = useState([0, 0])
    const [primero, setPrimero] = useState(0)
    const [segundo, setSegundo] = useState(6)
    const [pagina, setPagina] = useState(1)


    const sumandoMostrar = () => {
        setPagina(pagina + 1)
        setPrimero(primero + 6)
        setSegundo(segundo + 6)
        console.log(primero, segundo)
    }

    const restandoMostrar = () => {
        setPagina(pagina - 1)
        setPrimero(primero - 6)
        setSegundo(segundo - 6)
        console.log(primero, segundo)
    }

    const getNoticias = async () => {
        try {
            let apiKey = '474024da643847f8a3840934d173fef3'
            const response = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`)
            setNoticia(response.data.articles.slice(primero, segundo))
            console.log(noticia)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNoticias()
    }, [[], sumandoMostrar, restandoMostrar])

    return (
        <>
            <div className='NewsMargen'>
                {noticia.map((news, index) => {
                    return (
                        <UniNew key={index} noticia={news} ></UniNew>)
                })
                }
            </div>

            {(pagina > 1)
                ? <img src={Izquierdo} className='NewsSiSirve' onClick={restandoMostrar}/>
                : <img className='NewsNoSirve' src={Izquierdo}/>
            }


            {(pagina <= 10)
                ? <img src={Derecho} className='NewsSiSirve' onClick={sumandoMostrar}/>
                : <img className='NewsNoSirve' src={Derecho}/>
            }

        </>
    )
}

export default News