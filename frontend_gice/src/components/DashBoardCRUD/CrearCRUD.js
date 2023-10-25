import { useState } from "react"

function CrearCRUD(){
//Crear funciones en las que se guardara la informacion recopilada del formulario, Estas funciones seran declaradas con UseState
//Es una funcion por cada apartado, Funciones a crear para Cursos: titulo, descripcion, imagen, documento y Las funciones necesitaran de un argumento vacio
    const [tituloCurs, setTituloCurs] = useState('');
    const [desCurs, setDesCurs] = useState('');
    const [imgCurs, setImgCurs] = useState(null);   //nulo es igual a que empiece como valor vacio
    const [docuCurs, setDocuCurs] = useState(null);
//Funciones a crear para Usuarios : nombre, correo, contraseña 
    const [nomUsua, setNomUsua] = useState('');
    const [correoUsua, setCorreoUsua] = useState('');
    const [contraUsua, setContraUsua] = useState('');

/*     const agregar = async () => {
        const formData = new FormData();
        formData.append(tituloCurs);
        formData.append(desCurs);
        formData.append(imgCurs);
        formData.append(docuCurs);
    } */

    if (titulo == 'Usuarios') {
//Llamado al back de usarios //Se realiza peticion de post en la api //Se tienen que guardar los datos antes de mandarlos //contraseña vacia al momento de editar (hasheada)
        const crearUsuario = (e) =>{
            e.preventDefault();
            const URL = 'https//localhost:8080/usuarios';

            const requestOptionsAgregar = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            };
        }

    } else if (titulo == 'Cursos') {
        //Peticion get para los cursos
        const crearCursos = (e) =>{
            e.preventDefault();
            const URL = 'https//localhost:8080/cursos';

            const requestOptionsAgregar = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            };
        }
    }

    const CancelarAccion = () => {
        window.location.reload()
    }
//agregar una opcion (tipos de usuario con option) para guardar en la base de datos //no enviar un dato vasio de tipo .gmail
    const procesarRegistro = () => {
        // Validar que el campo de correo no esté vacío
        if (!usuario.correo) {
          alert('El campo de correo no puede quedar vacío.');
          return;
        }
        // Validar que el correo tenga el formato de Gmail
        if (!usuario.correo.endsWith('@gmail.com')) {
          alert('El correo debe ser de Gmail (@gmail.com).');
          return;
        }    
      };
    
//id de un index del map //nombreVar.map ((res, index)=>{ }) //conectar el contador usarios registrados //nombreVar.length

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
                                    <input 
                                    onChange={(e)=>setTituloCurs(e.target.value)} value={tituloCurs} id="titulo">
                                    </input>

                                    <label htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <input 
                                    onChange={(e)=>setDesCurs(e.target.value)} value={desCurs} id="descripcion">
                                    </input>

                                    <label htmlFor="imagen">
                                        Imagen
                                    </label>
                                    <input
                                     onChange={(e)=>setImgCurs(e.target.value)} value={imgCurs} id="imagen">
                                    </input>

                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <input onChange={(e)=>setDocuCurs(e.target.value)} value={docuCurs} id="documento">
                                    </input>

                                </form>
                                :
                                <form>
                                    <label htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input 
                                    onChange={(e)=>setNomUsua(e.target.value)} value={nomUsua} id="nombre">
                                    </input>

                                    <label htmlFor="correo">
                                        Correo Electronico
                                    </label>
                                    <input onChange={(e)=>setCorreoUsua(e.target.value)} value={correoUsua} id="correo">
                                    </input>

                                    <label htmlFor="contraseña">
                                        Contraseña
                                    </label>
                                    <input onChange={(e)=>setContraUsua(e.target.value)} value={contraUsua} id="contraseña">
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