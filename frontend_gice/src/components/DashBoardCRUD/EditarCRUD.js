import { useState } from "react"
import Swal from 'sweetalert2';

function EditarCRUD({titulo, usersOrCurso, setOpen}) {

    const GICE_API = process.env.REACT_APP_URL_API;

    const [user, setUser] = useState({
        idUsuario: usersOrCurso?.idUsuario,
        nombre: usersOrCurso?.nombre,
        correoElectronico: usersOrCurso?.correoElectronico,
        contraseña: usersOrCurso?.contraseña,
        idTipoUsuarioId: usersOrCurso?.idTipoUsuarioId
    })

    const [curso, setCurso] = useState({
        titulo: usersOrCurso?.titulo,
        descripcion: usersOrCurso?.descripcion,
        rutaImagen: '',
        rutaDocumento: '',
    })

    const editarUsuario = async (e) => {
        e.preventDefault();
        if (titulo === 'Users') {
            const URL = `${GICE_API}/usuarios`;
            const requestOptionsAgregar = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            };
    
            await fetch(URL, requestOptionsAgregar)
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: 'Usuario Editado',
                        text: 'El usuario fue editado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.reload()
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al editar el usuario, verifica los datos y vuelve a intentarlo',
                        icon: 'error'
                    });
                    console.log(error);
                });
        } else if (titulo === 'Cursos') {
            const URL = `${GICE_API}/cursos`;
            const requestOptionsAgregar = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                file: file,
                body: JSON.stringify(curso)
            };
    
            await fetch(URL, requestOptionsAgregar)
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: 'Curso editado exitosamente',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => window.location.reload());
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al editar el curso, verifica los datos y vuelve a intentarlo',
                        icon: 'error'
                    });
                    console.log(error);
                });
        }
    };


    const CancelarAccion = () => {
        setOpen(false)
    }



    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle2'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2>Editar {titulo}</h2>
                        {
                            titulo == 'Cursos' ?
                            <form onSubmit={editarUsuario}>
                                <label htmlFor="titulo" className="labelInputCrud">
                                    Titulo
                                </label>
                                <input
                                required
                                    onChange={(e) => setCurso({...curso, titulo: e.target.value})} value={curso.titulo} id="titulo">
                                </input>

                                <label htmlFor="descripcion" className="labelInputCrud">
                                    Descripcion
                                </label>
                                <input
                                required
                                    onChange={(e) => setCurso({...curso, descripcion: e.target.value})} value={curso.descripcion} id="descripcion">
                                </input>

                                <label htmlFor="imagen" className="labelInputCrud">
                                    Imagen
                                </label>
                                <input
                                type="file"
                                required
                                    onChange={(e) => setCurso({...curso, rutaImagen: e.target.value})} value={curso.rutaDocumento} id="imagen">
                                </input>

                                <label htmlFor="documento" className="labelInputCrud">
                                    Documento
                                </label>
                                <input required accept=".pdf" type="file" onChange={(e) => setCurso({...curso, rutaDocumento: e.target.value})} value={curso.rutaDocumento} id="documento">
                                </input>

                                <div className="EditCrearBotones">
                                    <button type="submit" className="crear">Agregar</button>
                                    <button type="button" onClick={CancelarAccion} className="cancelar">Cancelar</button>
                                </div>

                            </form>
                                : 
                                <form onSubmit={editarUsuario}>
                                    <label htmlFor="nombre" className="labelInputCrud">
                                        Nombre
                                    </label>
                                    <input type="text" required onChange={(e) => setUser({...user, nombre: e.target.value})} value={user.nombre} id="nombre">
                                    </input>

                                    <label htmlFor="correo" className="labelInputCrud">
                                        Correo Electronico
                                    </label>
                                    <input type="email" required onChange={(e) => setUser({...user, correoElectronico: e.target.value})} value={user.correoElectronico} id="correo">
                                    </input>

                                    <label htmlFor="contraseña" className="labelInputCrud">
                                        Contraseña
                                    </label>
                                    <input type="password" required onChange={(e) => setUser({...user, contraseña: e.target.value})} value={user.contraseña} id="contraseña">
                                    </input>
                                    <label htmlFor="contraseña" className="labelInputCrud">
                                        Tipo de Usuario
                                    </label>
                                    <select required onChange={(e) => setUser({...user, idTipoUsuarioId: e.target.value})} value={user.idTipoUsuarioId} id="contraseña">
                                        <option value='' disabled >Seleccionar un tipo de usuario</option>
                                        <option value={1}>Administrador</option>
                                        <option value={2}>Usuario Regular</option>
                                    </select>
                                    <div className="EditCrearBotones">
                                        <button type="submit" className="crear">Agregar</button>
                                        <button type="button" onClick={CancelarAccion} className="cancelar">Cancelar</button>
                                    </div>
                                </form>
                        }
                    </div>

                </div >

            </div>
        </>
    )
}

export default EditarCRUD