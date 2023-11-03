import { useState } from "react"

function EditarCRUD({titulo, usersOrCurso, setOpen}) {
    const [tituloCurs, setTituloCurs] = useState(usersOrCurso?.titulo);
    const [desCurs, setDesCurs] = useState(usersOrCurso?.descripcion);
    const [imgCurs, setImgCurs] = useState(usersOrCurso?.rutaImagen);
    const [docuCurs, setDocuCurs] = useState(usersOrCurso?.rutaDocumento);

    const [nomUsua, setNomUsua] = useState(usersOrCurso?.nombre);
    const [correoUsua, setCorreoUsua] = useState(usersOrCurso?.correoElectronico);
    const [contraUsua, setContraUsua] = useState(usersOrCurso?.pass);

    const editar = async () => {
        if (titulo == 'Users') {

            const URL = 'http://localhost:8080/usuarios';

            const objectUsuario = { 
                nombre: nomUsua, 
                correoElectronico: correoUsua, 
                contraseña: contraUsua, 
                idUsuario: usersOrCurso.idUsuario};

            const requestOptionsAgregar = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(objectUsuario)
            };

            
            await fetch(URL, requestOptionsAgregar)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log("agregado");
                    setOpen(false)
                })
                .catch (error => { 
                    console.log(error);
                    console.log("error");
                })

        } else if (titulo == 'Cursos') {
            //console.log(titulo);
            const URL = 'http://localhost:8080/cursos';
            console.log(tituloCurs, desCurs, docuCurs, imgCurs, usersOrCurso.idCurso);

            const data = {
                titulo: tituloCurs,
                descripcion: desCurs,
                rutaImagen: imgCurs,
                rutaDocumento: docuCurs,
                idCurso: usersOrCurso.idCurso
            }

            const formDataUno = new FormData();
            formDataUno.append("titulos", tituloCurs)
            console.log(data);
            const requestOptionsModificar = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            fetch(URL, requestOptionsModificar)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log("agregado")
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    const editarUsuario = async (e) => {
        e.preventDefault();
        await editar();
    }


    const CancelarAccion = () => {
        setOpen(false)
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
                           
                                <form onSubmit={editarUsuario}>
                                    <label htmlFor="titulo">
                                        Titulo 
                                    </label>
                                    <input
                                        onChange={(e) => setTituloCurs(e.target.value)} value={tituloCurs} id="titulo"> 
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
                                    <span>Actualmente : {imgCurs}</span>
                                    <input
                                        id="imagen" onChange={(e)=>setImgCurs(e.target.value)} type="file">
                                    </input>


                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <span>Actualmente : {docuCurs}</span>
                                    <input
                                        id="documento" onChange={(e)=>setDocuCurs(e.target.value)} type="file" >
                                    </input>

                                </form>
                                : 
                                <form onSubmit={editarUsuario}>
                                    <label htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input 
                                        onChange={(e) => setNomUsua(e.target.value)} value={nomUsua} id="nombre">
                                    </input>

                                    <label htmlFor="correo">
                                        Correo Electronico
                                    </label>
                                    <input 
                                        onChange={(e) => setCorreoUsua(e.target.value)} value={correoUsua} id="correo">
                                    </input>
                                    <label htmlFor="contraseña">
                                        Contraseña
                                    </label>
                                    <input 
                                        type="password" onChange={(e) => setContraUsua(e.target.value)} value={contraUsua} id="password">
                                    </input>

                                </form>
                        }
                        <div className="EditCrearBotones">
                            <button className="crear" type="submit" onClick={editarUsuario}> Editar</button>
                            <button id="cancelar" onClick={CancelarAccion}>Cancelar</button>
                        </div>
                    </div>

                </div >

            </div>
        </>
    )
}

export default EditarCRUD