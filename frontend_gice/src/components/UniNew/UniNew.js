import './UniNew.css'

function UniNew({noticia}) {

    const {author, content, description, publishedAt, source, title, url, urlToImage} = noticia

    return (

        <>
            <div className="UniNewsModuloIndividual">
                <div className='UniNewsParteIzquierda'>
            <img src={urlToImage}/>
                </div>


                <div className="UniNewsParteDerecha">
                    <h3>{title}</h3>
                    <p style={{textAlign:'start'}}>{description}</p>
                    <a href={url} className='LearnMore'>Learn more about</a>
                </div>

            </div>
        </>

    )
}

export default UniNew