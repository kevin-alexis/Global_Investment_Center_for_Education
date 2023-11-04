import { useState } from "react"
import Swal from 'sweetalert2';


function CrearCRUD({ titulo }) {
    const GICE_API = process.env.REACT_APP_URL_API;

    const [user, setUser] = useState({
        nombre: '',
        correoElectronico: '',
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
            
            e.preventDefault();

            const imagenFile = e.target.imagen.files[0];
            const documentoFile = e.target.documento.files[0];
        
            // Validar que la imagen sea JPG o PNG
            if (imagenFile && !['image/jpeg', 'image/png'].includes(imagenFile.type)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, selecciona una imagen JPG o PNG',
                    icon: 'error'
                });
                return;
            }
        
            // Validar que el documento sea PDF
            if (documentoFile && documentoFile.type !== 'application/pdf') {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, selecciona un archivo PDF',
                    icon: 'error'
                });
                return;
            }

            const formData = new FormData();
            formData.append('titulo', curso.titulo);
            formData.append('descripcion', curso.descripcion);
            formData.append('rutaImagen', e.target.imagen.files[0]);
            formData.append('rutaDocumento', e.target.documento.files[0]);

            const requestOptionsAgregar = {
                method: 'POST',
                body: formData,
            };
            console.log(formData);

            try {
                const URL = `${GICE_API}/cursos`;
                const response = await fetch(URL, requestOptionsAgregar);
                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: 'Curso creado',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: 'OK'
                    }).then(() => window.location.reload());
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al crear el curso',
                        icon: 'error'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al crear el curso',
                    icon: 'error'
                });
                console.error(error);
            }
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
                                    type="text"
                                    required
                                        onChange={(e) => setCurso({...curso, titulo:e.target.value})} value={curso.titulo} id="titulo">
                                    </input>

                                    <label htmlFor="descripcion" className="labelInputCrud">
                                        Descripcion
                                    </label>
                                    <input
                                    type="text"
                                    required
                                    onChange={(e) => setCurso({...curso, descripcion:e.target.value})} value={curso.descripcion} id="descripcion">
                                    </input>

                                    <label htmlFor="imagen" className="labelInputCrud">
                                        Imagen
                                    </label>
                                    <input
                                    required
                                    accept=".png, .jpg"
                                        type="file" onChange={(e) => setCurso({...curso, rutaImagen:e.target.value})} value={curso.rutaImagen} id="imagen">
                                    </input>

                                    <label htmlFor="documento" className="labelInputCrud">
                                        Documento
                                    </label>
                                    <input 
                                    required
                                        accept=".pdf" type="file" onChange={(e) => {
                                            setCurso({...curso, rutaDocumento:e.target.value})
                                        }} value={curso.rutaDocumento} id="documento">
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
                                        <option value='' disabled className="optionSelect">Seleccionar un tipo de usuario</option>
                                        <option value={1} className="optionSelect">Administrador</option>
                                        <option value={2} className="optionSelect">Usuario Regular</option>
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