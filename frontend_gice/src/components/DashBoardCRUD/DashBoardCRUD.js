import { useState } from 'react'
import './DashBoardCRUD.css'
import EditButton from '../../assets/EditButton.png'
import DeleteButton from '../../assets/DeleteButton.png'
import EditarCRUD from './EditarCRUD'
import CrearCRUD from './CrearCRUD'

function DashBoardCRUD({ titulo }) {

    const [array, setArray] = useState([]) // cambiar para que consuma la peticion de get (aqui se guardara el array de respuesta)
    const [abrirNuevo, setAbrirNuevo] = useState(false)
    const [editarObjeto, setEditarObjeto] = useState(false)
    const [object, setObject] = useState({})
    //crear crud 

    // if (titulo == 'Usuarios') {
    //     //Llamado al back de usarios
    //     //la llamada que va hacer sera un metodo get
    //     setArray([{titulo: ""}])
    //     //contraseña vacia al momento de editar (hasheada)

    // } else if (titulo == 'Cursos') {
    //     //Peticion get para los cursos
    // }

const FuncEliminar = async () => {
        //peticion a la api para eliminar el objeto
    if('Usuarios'){
        try {
            const URL = `http://localhost:8080/usuarios`;
    
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            };
    
            const response = await fetch(URL, requestOptions);
    
            if (response.ok) {
            } else {
                console.error('Error al eliminar el objeto');
            }
        } catch (error) {
            console.error('Error al eliminar el objeto', error);
        }
    }else if('Cursos'){
        try {
            const URL = `http://localhost:8080/cursos`;
    
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            };
    
            const response = await fetch(URL, requestOptions);
    
            if (response.ok) {
            } else {
                console.error('Error al eliminar el objeto');
            }
        } catch (error) {
            console.error('Error al eliminar el objeto', error);
        }
    }
}

    const FuncEditar = (element) => {
        setObject(element)
        setEditarObjeto(true)
        console.log(editarObjeto)
        
    }

    const FuncCrear = () => {
        setAbrirNuevo(true)
    }


    return (
        <>
            {editarObjeto?
                <EditarCRUD titulo ={titulo} data = {object} />
                :
                ''
            }
            
            {abrirNuevo
                ?
                <CrearCRUD titulo ={titulo} />
                :
                ''
            }

            <div className='DashBoardCRUDBody'>
                <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                <div className="DashBoardCRUDDiv">
                    <div className='DashBoardCRUDBorder'>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <h2 className='DashBoardCRUDTittle' style={{ fontSize: 32 + 'px' }}>{titulo}</h2>
                            <h3 style={{ cursor:'pointer'}} onClick={FuncCrear}>Nuevo_{titulo}...</h3>
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
                                            array.map((element, index) => {
                                                console.log(element)
                                                return (
                                                    <tr className='DashBoardCRUDTable'>
                                                        <td>{index}</td>  
                                                        <td>Primer Curso</td>
                                                        <td>Esto es la descripcion</td>
                                                        <th>esta es la rutaDocumento</th>
                                                        <th>esta es la rutaImagen</th>
                                                        <th>8</th>
                                                        <th><img onClick={()=>FuncEditar(element)} style={{cursor:'pointer'}} src={EditButton}></img></th>
                                                        <th><img onClick={FuncEliminar} style={{cursor:'pointer'}} src={DeleteButton}></img></th>
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
                                            array.map((element, index) => {
                                                console.log(element)
                                                return (
                                                    <tr className='DashBoardCRUDTable'>
                                                        <td>{index}</td>
                                                        <td>Nombre</td>
                                                        <td>@gmail.com</td>
                                                        <th>****</th>
                                                        <th><img onClick={()=>FuncEditar(element)} style={{cursor:'pointer'}} src={EditButton}></img></th>
                                                        <th><img onClick={FuncEliminar} style={{cursor:'pointer'}} src={DeleteButton}></img></th>
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