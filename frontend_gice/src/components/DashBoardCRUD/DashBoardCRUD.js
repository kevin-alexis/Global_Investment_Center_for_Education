import { useState } from 'react'
import './DashBoardCRUD.css'
import EditButton from '../../assets/EditButton.png'
import DeleteButton from '../../assets/DeleteButton.png'
import EditarCRUD from './EditarCRUD'
import CrearCRUD from './CrearCRUD'

function DashBoardCRUD({ titulo }) {

    const [array, setArray] = useState([1, 2, 3, [], [], 1, 2, 3, [], []])
    const [abrirNuevo, setAbrirNuevo] = useState(false)
    const [editarObjeto, setEditarObjeto] = useState(false)
    const [eliminarObjeto, setEliminarObjeto] = useState(false)

    if (titulo == 'Usuarios') {
        //Llamado al back de usarios
    } else if (titulo == 'Cursos') {
        //Peticion get para los cursos
    }

    const FuncEliminar = () => {
    }

    const FuncEditar = () => {
        setEditarObjeto(true)
        console.log(editarObjeto)
    }

    const FuncCrear = () => {
        setAbrirNuevo(true)
    }


    return (
        <>
            {editarObjeto?
                <EditarCRUD titulo ={titulo} />
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
                                            array.map((element) => {
                                                console.log(element)
                                                return (
                                                    <tr className='DashBoardCRUDTable'>
                                                        <td>{element}</td>
                                                        <td>Primer Curso</td>
                                                        <td>Esto es la descripcion</td>
                                                        <th>esta es la rutaDocumento</th>
                                                        <th>esta es la rutaImagen</th>
                                                        <th>8</th>
                                                        <th><img onClick={FuncEditar} style={{cursor:'pointer'}} src={EditButton}></img></th>
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
                                            array.map((element) => {
                                                console.log(element)
                                                return (
                                                    <tr className='DashBoardCRUDTable'>
                                                        <td>{element}</td>
                                                        <td>Nombre</td>
                                                        <td>@gmail.com</td>
                                                        <th>****</th>
                                                        <th><img onClick={FuncEditar} style={{cursor:'pointer'}} src={EditButton}></img></th>
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