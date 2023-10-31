import { useState } from "react"
//import bcrypt from "bcrypt";

function EditarCRUD() {
//Crear funciones en las que se guardara la informacion recopilada del formulario
//Estas funciones seran declaradas con UseState
//Es una funcion por cada apartado
//Funciones a crear para Cursos: titulo, descripcion, imagen, documento
    const [tituloCurs, setTituloCurs] = useState('');
    const [desCurs, setDesCurs] = useState('');
    const [imgCurs, setImgCurs] = useState(''); 
    const [docuCurs, setDocuCurs] = useState('');
//Funciones a crear para Usuarios : nombre, correo, contraseña
    const [nomUsua, setNomUsua] = useState('');
    const [correoUsua, setCorreoUsua] = useState('');
    const [contraUsua, setContraUsua] = useState('');

    //Las funciones necesitaran de argumentos
    const [info, setInfo] = useState('')

    const CancelarAccion = () => {
        window.location.reload()
    }

    if (titulo == 'Usuarios') {
        //Llamado al back de usarios    
        //contraseña vacia al momento de editar (hasheada)
        

    } else if (titulo == 'Cursos') {
        //Peticion get para los cursos
        console.log(info)
    }



    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2>Editar {titulo}</h2>
                        {
                            titulo == 'Cursos' ?
                                <form>
                                    <label htmlFor="titulo">
                                        Titulo {/* El nombre que se le va a dar a la variable de abajo es titulo */}
                                    </label>
                                    <input 
                                    onChange={(e)=>({...info, titulo: e.target.value})} value={info.titulo} id="titulo"> {/*La sintaxis de onChange es la misma en todas lo unico que cambia es el nombre de la variable, al igual que la de value*/}
                                    </input>

                                    <label htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <input 
                                    onChange={(e)=>({...info, descripcion: e.target.value})} value={info.descripcion} id="descripcion">
                                    </input>

                                    <label htmlFor="imagen">
                                        Imagen
                                    </label>
                                    <input 
                                    onChange={(e)=>({...info, imagen: e.target.value})} value={info.info} id="imagen">
                                    </input>

                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <input 
                                    onChange={(e)=>({...info, documento: e.target.value})} value={info.documento} id="documento">
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

export default EditarCRUD