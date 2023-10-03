import News from '../../components/news/News'
import './Noticias.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Noticias() {
    return (
        <>
            <div className='NoticiasFondo'>
                
            </div>
            <div >
                <Navbar />
                <h1 className='NoticiasTitulo'> Noticias</h1>
            </div>

            <News />
            <div>
                <Footer/>
            </div>
        </>
    )
}

export default Noticias

