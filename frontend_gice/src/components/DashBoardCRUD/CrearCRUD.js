import { useState } from "react"
import Swal from 'sweetalert2';


function CrearCRUD({ titulo }) {
    const GICE_API = process.env.REACT_APP_URL_API;

    const [user, setUser] = useState({
        nombre: '',
        correoElectronico: '',
        contraseña: '',
        contraseña: '',
        idTipoUsuarioId: ''
    })

    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        rutaImagen: '',
        rutaDocumento: '',
    })

    const crearUsuario = async (e) => {
        e.preventDefault();
        if (titulo === 'Users') {
            const URL = `${GICE_API}/usuarios`;
            const requestOptionsAgregar = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            };
    
            await fetch(URL, requestOptionsAgregar)
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: 'Usuario Creado',
                        text: 'El usuario fue creado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.reload()
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ya hay un usuario vinculado a ese correo',
                        icon: 'error'
                    });
                    console.log(error);
                });
        } else if (titulo === 'Cursos') {
            const URL = `${GICE_API}/cursos`;
            const requestOptionsAgregar = {
                method: 'POST',
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
                        title: 'Curso creado',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => window.location.reload());
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al crear el curso',
                        icon: 'error'
                    });
                    console.log(error);
                });
        }
    };

    const CancelarAccion = () => {
        window.location.reload()
    }

    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle2'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2 className="TituloCrudCrear">Crear {titulo}</h2>
                        {
                            titulo == 'Cursos' ?
                                <form onSubmit={crearUsuario}>
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
                                <form onSubmit={crearUsuario}>
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

export default CrearCRUD