import { useEffect, useState } from 'react'
import './DashBoardCRUD.css'
import EditButton from '../../assets/EditButton.png'
import DeleteButton from '../../assets/DeleteButton.png'
import EditarCRUD from './EditarCRUD'
import CrearCRUD from './CrearCRUD'
import Swal from 'sweetalert2';


function DashBoardCRUD({ titulo }) {

    const GICE_API = process.env.REACT_APP_URL_API;

    const [cursos, setCursos] = useState([])
    const [abrirNuevo, setAbrirNuevo] = useState(false)
    const [mostarFormEditar, setMostarFormEditar] = useState(false)
    const [users, setUsers] = useState([])
    const [usersOrCurso, setUsersOrCurso] = useState({})
    

    const FuncEliminar = async (id, rutaDocumento, rutaImagen) => {
        //console.log(idUsuario);

        const confirmarEliminacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });

        if (confirmarEliminacion.isConfirmed) {
            const requestOptionsEliminar = {
                method: 'DELETE',
                headers: {
                        "Content-Type": "application/json"
                },
                body: titulo === 'Users' ? JSON.stringify({idUsuario: id}) : JSON.stringify({idCurso: id, rutaDocumento: rutaDocumento, rutaImagen: rutaImagen})
            
            };
            if (titulo === 'Users') {

                if (id === 1) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No puedes eliminar al administrador. Debes mantener al menos un usuario como administrador.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }

                const URL = `${GICE_API}/usuarios`;
                
        
                try {
                    const response = await fetch(URL, requestOptionsEliminar);
                    console.log("mensaje",response)
    
                    if (response.ok) {
                        console.log('Usuario eliminado con éxito');
                        window.location.reload();
                    } else {
                        console.error('Error al eliminar el usuario');
                    }
                } catch (error) {
                    console.error('Error al eliminar', error);
                }
            } else if (titulo == 'Cursos') {
        
                const URL = `${GICE_API}/cursos`;
        
                try {
                    const response = await fetch(URL, requestOptionsEliminar);
                    if (response.ok) {
                        console.log('Curso eliminado con éxito');
                        window.location.reload();
                    } else {
                        console.error('Error al eliminar el curso');
                    }
                } catch (error) {
                    console.error('Error al eliminar el curso', error);
                }
            }
        }
        
        
    };

    const FuncEditar = (element) => {
        setUsersOrCurso(element)
        setMostarFormEditar(true)
    }

    const FuncCrear = () => {
        setAbrirNuevo(true)
    }

    useEffect(()=>{
        FuncLlamar()
    },[mostarFormEditar])


    const FuncLlamar = async () => {
        if(titulo == 'Users'){
            try {
                const URL = `${GICE_API}/usuarios`;
        
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                };

                const response = await fetch(URL, requestOptions)
                const listadoUsers = await response.json()
                setUsers(listadoUsers)  
                if (response.ok) {
                } else {
                    console.error('Error al obtener datos');
                }
            } catch (error) {
                console.error('Error al obtener datos');
            }
        }else if(titulo == 'Cursos'){
            try {
                const URL = `${GICE_API}/cursos`;
        
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                };
        
                const response = await fetch(URL, requestOptions);
        
                if (response.ok) {
                const listadoCursos = await response.json()
                setCursos(listadoCursos) 
                } else {
                    console.error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        }
    }

    function obtenerFechaActual() {
        const fechaActual = new Date();

        const dia = fechaActual.getDate().toString().padStart(2, '0'); 
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
        const anio = fechaActual.getFullYear().toString().slice(-2);

        const fechaFormateada = `${dia}-${mes}-${anio}`;

        return fechaFormateada;
    }

    const fechaActualFormateada = obtenerFechaActual();    



    return (
        <>
            {mostarFormEditar
                ?
                <EditarCRUD titulo = {titulo} usersOrCurso = {usersOrCurso} setOpen = {setMostarFormEditar}/>
                :
                ''

            }
            
            {abrirNuevo
                ?
                <CrearCRUD titulo ={titulo} usersOrCurso = {usersOrCurso} setOpen = {setMostarFormEditar}/>
                :
                ''
            }

            <div className={mostarFormEditar || abrirNuevo ? 'DashBoardCRUDBody hiddeDash' : 'DashBoardCRUDBody'}>
            <div className='DateTitleContainer'>
                    <h1 className='DashBoardCRUDTittleWhite'>Dashboard</h1>
                <div className="DashboardDate">
                        {fechaActualFormateada}
                    </div>
                </div>
                <div className="DashBoardCRUDDiv">
                    <div className='DashBoardCRUDBorder'>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <h2 className='DashBoardCRUDTittle' style={{ fontSize: 32 + 'px' }}>{titulo}</h2>
                            <h3 style={{ cursor:'pointer'}} onClick={FuncCrear}>Nuevo {titulo}</h3>
                        </div>
                        <div className='TableDashboard'>

                            {(titulo == 'Cursos') ?
                                <table style={{ width: 100 + '%' }} className='tableCrud'>
                                    <thead style={{ border: 0 }}>
                                            <tr className='theadRow'>
                                                <th className='textCrud'>id</th>
                                                <th className='textCrud'>titulo</th>
                                                <th className='textCrud'>descripción</th>
                                                <th className='textCrud'>rutaDocumento</th>
                                                <th className='textCrud'>rutaImagen</th>
                                                <th className='textCrud'>numDescargas</th>
                                                <th className='textCrud'>Editar</th>
                                                <th className='textCrud'>Eliminar</th>
                                            </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            cursos?.map((curso, index) => {
                                                
                                                return (
                                                    <tr key={curso.idCurso} className='DashBoardCRUDTable' style={{backgroundColor: index % 2 !== 0 ? '#1A202C' : null }}>
                                                        <td className='tableCell textCrud'>{index+1}</td>  
                                                        <td className='tableCell textCrud'>{curso.titulo}</td>
                                                        <td className='tableCell textCrud'>{curso.descripcion}</td>
                                                        <th className='tableCell rutaDocumentoEstilos textCrud'>{curso.rutaDocumento}</th>
                                                        <th className='tableCell rutaImagenEstilos textCrud'>{curso.rutaImagen}</th>
                                                        <th className='tableCell textCrud'>{curso.numDescargas}</th>
                                                        <th className='tableCell textCrud'><img onClick={()=>FuncEditar(curso)} style={{cursor:'pointer'}} src={EditButton}></img></th>
                                                        <th className='tableCell textCrud'><img onClick={()=>FuncEliminar(curso.idCurso, curso.rutaDocumento, curso.rutaImagen)} style={{cursor:'pointer'}} src={DeleteButton}></img></th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <table style={{ width: 100 + '%' }} className='tableCrud'>
                                    <thead style={{ border: 0 }}>
                                        <tr className='theadRow'>
                                            <th className='textCrud'>id</th>
                                            <th className='textCrud'>nombre</th>
                                            <th className='textCrud'>correo_electronico</th>
                                            <th className='textCrud'>contraseña</th>
                                            <th className='textCrud'>Editar</th>
                                            <th className='textCrud'>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            users?.map((user, index) => {    //el ? significa que solo muestre datos si users tiene algo
                                                return (
                                                    <tr key={user.idUsuario}className='DashBoardCRUDTable' style={{backgroundColor: index % 2 !== 0 ? '#1A202C' : null }}>
                                                        <td className='textCrud'>{index+1}</td>
                                                        <td className='textCrud'>{user.nombre}</td>
                                                        <td className='textCrud'>{user.correoElectronico}</td>
                                                        <td className='textCrud'>*****</td>
                                                        <td className='textCrud'><img onClick={()=>FuncEditar(user)} style={{cursor:'pointer'}} src={EditButton}></img></td>
                                                        <td className='textCrud'><img onClick={()=>FuncEliminar(user.idUsuario)} style={{cursor:'pointer'}} src={DeleteButton}></img></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>    
                                </table>
                            }
                        </div>
                    </div>
                </div>

            </div >

        </>
    )
}

export default DashBoardCRUD