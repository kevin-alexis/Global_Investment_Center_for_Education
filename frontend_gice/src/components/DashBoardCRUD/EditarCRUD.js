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
        idCurso: usersOrCurso?.idCurso,
        titulo: usersOrCurso?.titulo,
        descripcion: usersOrCurso?.descripcion,
        // rutaImagen: usersOrCurso?.rutaImagen,
        // rutaDocumento: usersOrCurso?.rutaDocumento
        rutaImagen: null,
        rutaDocumento: null
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
        
            e.preventDefault();

            const formData = new FormData();
            formData.append('idCurso', curso.idCurso);
            formData.append('titulo', curso.titulo);
            formData.append('descripcion', curso.descripcion);
            if (curso.rutaImagen) {
            formData.append('rutaImagen', curso.rutaImagen);
            }
            if (curso.rutaDocumento) {
            formData.append('rutaDocumento', curso.rutaDocumento);
            }

            const requestOptionsActualizar = {
            method: 'PUT',
            body: formData,
            };

            fetch(`${GICE_API}/cursos`, requestOptionsActualizar)
            .then((response) => response.json())
            .then(data => {
                Swal.fire({
                    title: 'Curso Actualizado',
                    text: 'El curso fue actualizado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload()
                });
            })
            .catch((error) => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al actualizar el curso',
                icon: 'error',
            });
            console.error(error);
            });
        };
}

const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setCurso((prevCurso) => ({
      ...prevCurso,
      [name]: file,
    }));
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
                                accept=".png, .jpg"
                                name="rutaImagen"
                                onChange={handleFileChange} id="imagen">
                                </input>

                                <label htmlFor="documento" className="labelInputCrud">
                                    Documento
                                </label>
                                <input 
                                name="rutaDocumento"
                                onChange={handleFileChange}
                                 accept=".pdf" type="file" id="documento">
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