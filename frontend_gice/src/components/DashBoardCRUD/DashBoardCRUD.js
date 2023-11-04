import { useEffect, useState } from 'react'
import './DashBoardCRUD.css'
import EditButton from '../../assets/EditButton.png'
import DeleteButton from '../../assets/DeleteButton.png'
import EditarCRUD from './EditarCRUD'
import CrearCRUD from './CrearCRUD'

function DashBoardCRUD({ titulo }) {

    const GICE_API = process.env.REACT_APP_URL_API;


    const [cursos, setCursos] = useState([])
    const [abrirNuevo, setAbrirNuevo] = useState(false)
    const [mostarFormEditar, setMostarFormEditar] = useState(false)
    const [users, setUsers] = useState([])
    const [usersOrCurso, setUsersOrCurso] = useState({})
    

    const FuncEliminar = async (id) => {
        //console.log(idUsuario);
    
            const requestOptionsEliminar = {
                method: 'DELETE',
                headers: {
                     "Content-Type": "application/json"
                },
                body: titulo == 'Users' ? JSON.stringify({idUsuario: id}) : JSON.stringify({idCurso: id})
            
        };
        if (titulo == 'Users') {
            const URL = `${GICE_API}/usuarios`;
            
    
            try {
                const response = await fetch(URL, requestOptionsEliminar);
                console.log("mensaje",response)

                if (response.ok) {
                    console.log('Usuario eliminado con éxito');
                    FuncLlamar();
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
                    FuncLlamar();
                } else {
                    console.error('Error al eliminar el curso');
                }
            } catch (error) {
                console.error('Error al eliminar el curso', error);
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
                    console.error('Error al eliminar el objeto');
                }
            } catch (error) {
                console.error('Error al eliminar el objeto', error);
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
                    console.error('Error al eliminar el objeto');
                }
            } catch (error) {
                console.error('Error al eliminar el objeto', error);
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

            <div className='DashBoardCRUDBody'>
            <div className='DateTitleContainer'>
                    <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
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
                                <table style={{ width: 100 + '%' }}>
                                    <thead style={{ border: 0 }}>
                                        <tr>
                                            <th>id</th>
                                            <th>titulo</th>
                                            <th>descripción</th>
                                            <th>rutaDocumento</th>
                                            <th>rutaImagen</th>
                                            <th>numDescargas</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            cursos?.map((curso, index) => {
                                                
                                                return (
                                                    <tr key={curso.idCurso} className='DashBoardCRUDTable'>
                                                        <td>{index}</td>  
                                                        <td>{curso.titulo}</td>
                                                        <td>{curso.descripcion}</td>
                                                        <th>{curso.rutaDocumento}</th>
                                                        <th>{curso.rutaImagen}</th>
                                                        <th>{curso.numDescargas}</th>
                                                        <th><img onClick={()=>FuncEditar(curso)} style={{cursor:'pointer'}} src={EditButton}></img></th>
                                                        <th><img onClick={()=>FuncEliminar(curso.idCurso)} style={{cursor:'pointer'}} src={DeleteButton}></img></th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <table style={{ width: 100 + '%' }}>
                                    <thead style={{ border: 0 }}>
                                        <tr>
                                            <th>id</th>
                                            <th>nombre</th>
                                            <th>correo_electronico</th>
                                            <th>contraseña</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            users?.map((user, index) => {    //el ? significa que solo muestre datos si users tiene algo
                                                return (
                                                    <tr key={user.idUsuario}className='DashBoardCRUDTable'>
                                                        <td>{index+1}</td>
                                                        <td>{user.nombre}</td>
                                                        <td>{user.correoElectronico}</td>
                                                        <th>*****</th>
                                                        <th><img onClick={()=>FuncEditar(user)} style={{cursor:'pointer'}} src={EditButton}></img></th>
                                                        <th><img onClick={()=>FuncEliminar(user.idUsuario)} style={{cursor:'pointer'}} src={DeleteButton}></img></th>
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