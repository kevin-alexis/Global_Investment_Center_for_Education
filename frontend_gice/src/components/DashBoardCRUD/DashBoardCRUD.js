import { useState } from 'react'
import './DashBoardCRUD.css'
import EditButton from '../../assets/EditButton.png'
import DeleteButton from '../../assets/DeleteButton.png'

function DashBoardCRUD({ titulo }) {

    const [array, setArray] = useState([1, 2, 3, [], [], 1, 2, 3, [], []])

    if (titulo == 'Usuarios') {
        //Llamado al back de usarios
    } else if (titulo == 'Cursos') {
        //Peticion get para los cursos
    }

    return (
        <>
            <div className='DashBoardCRUDBody'>
                <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                <div className="DashBoardCRUDDiv">
                    <div className='DashBoardCRUDBorder'>
                        <h2 className='DashBoardCRUDTittle' style={{ fontSize: 32 + 'px' }}>{titulo}</h2>
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
                                                        <th><img src={EditButton}></img></th>
                                                        <th><img src={DeleteButton}></img></th>
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
                                                        <th><img src={EditButton}></img></th>
                                                        <th><img src={DeleteButton}></img></th>
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