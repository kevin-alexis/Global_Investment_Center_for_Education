import React, { useState } from 'react'
import News from '../../components/news/News'
import './Noticias.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Noticias() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
     
    return (
        <>
            <div className='NoticiasFondo'>

            </div>

            <Navbar show={show} setShow={setShow}/>
            {
                show?
                null:
                <>
                    <div >
                        <h1 className='NoticiasTitulo'> Noticias</h1>
                    </div>

                    <News loading={loading} setLoading={setLoading}/>
                    <div>
                        <Footer />
                    </div>
                </>

            }
        </>
    )
}

export default Noticias

