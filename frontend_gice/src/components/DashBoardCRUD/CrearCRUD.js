import { useState } from "react"

function CrearCRUD({ titulo }) {
    
    //Crear funciones en las que se guardara la informacion recopilada del formulario
    //Estas funciones seran declaradas con UseState
    //Es una funcion por cada apartado
    // Funciones a crear para Cursos: titulo, descripcion, imagen, documento
    // Funciones a crear para Usuarios : nombre, correo, contraseña
    //Las funciones necesitaran de un argumento vacio
    const [tituloDoc, setTituloDoc] = useState('')

    if (titulo == 'Usuarios') {
        //Llamado al back de usarios
        //Se realiza peticion de post en la api
        //Se tienen que guardar los datos antes de mandarlos
    //contraseña vacia al momento de editar (hasheada)

    } else if (titulo == 'Cursos') {
        //Peticion get para los cursos
    }

    const CancelarAccion = () => {
        window.location.reload()
    }
    //agregar una opcion (tipos de usuario con option) para guardar en la base de datos
    //no enviar un dato vasio de tipo .gmail
    //id de un index del map
    // nombreVar.map ((res, index)=>{ })
    //conectar el contador usarios registrados
    // nombreVar.length

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
                                    <input onChange={(e)=>setTituloDoc(e.target.value)} value={tituloDoc} id="titulo">
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