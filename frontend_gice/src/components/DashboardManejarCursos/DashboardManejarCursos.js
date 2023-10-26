import { useState } from "react"

function CrearCRUD({ titulo }) {

    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        rutaImagen: '',
        rutaDocumento: ''
    })


    const CancelarAccion = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2>CREAR Curso</h2>
                                <form onSubmit={crearUsuario}>
                                    <label htmlFor="titulo">
                                        Titulo
                                    </label>
                                    <input
                                        onChange={(e) => setTituloCurs(e.target.value)} value={curso.titulo} id="titulo">
                                    </input>

                                    <label htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <input
                                        onChange={(e) => setDesCurs(e.target.value)} value={curso.descripcion} id="descripcion">
                                    </input>

                                    <label htmlFor="imagen">
                                        Imagen
                                    </label>
                                    <input
                                    type="file"
                                        onChange={(e) => setImgCurs(e.target.value)} value={curso.rutaImagen} id="imagen">
                                    </input>

                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <input accept=".pdf" type="file" onChange={(e) => setDocuCurs(e.target.value)} value={curso.rutaDocumento} id="documento">
                                    </input>
                                </form>
                        <div className="EditCrearBotones">
                            <button type="submit" onClick={crearUsuario}> Crear</button>
                            <button onClick={CancelarAccion}>Cancelar</button>
                        </div>
                    </div>
                </div >

            </div>
        </>
    )

}

export default CrearCRUD