
function CrearCRUD({ titulo }) {
    
    const CancelarAccion = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2>Crear {titulo}</h2>
                        {
                            titulo == 'Cursos' ?
                                <form>
                                    <label htmlFor="titulo">
                                        Titulo
                                    </label>
                                    <input id="titulo">
                                    </input>

                                    <label htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <input id="descripcion">
                                    </input>
                                    <label htmlFor="imagen">
                                        Imagen
                                    </label>
                                    <input id="imagen">
                                    </input>

                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <input id="documento">
                                    </input>
                                </form>
                                :
                                <form>
                                    <label htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input id="nombre">
                                    </input>

                                    <label htmlFor="correo">
                                        Correo Electronico
                                    </label>
                                    <input id="correo">
                                    </input>
                                    <label htmlFor="contraseña">
                                        Contraseña
                                    </label>
                                    <input id="contraseña">
                                    </input>


                                </form>
                        }
                        <div className="EditCrearBotones">
                            <button> Editar</button>
                            <button onClick={CancelarAccion}>Cancelar</button>
                        </div>
                    </div>
                </div >

            </div>
        </>
    )

}

export default CrearCRUD