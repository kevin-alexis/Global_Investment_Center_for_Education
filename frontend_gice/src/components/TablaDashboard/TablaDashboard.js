import React from 'react'
import './TablaDashboard.css'

const TablaDashboard = () => {


    return (
        <div className='TableDashboard'>
            <table>
                <thead>
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
                <tr>
                        <td>0</td>
                        <td>Primer Curso</td>
                        <td>Esto es la descripcion</td>
                        <th>esta es la rutaDocumento</th>
                        <th>esta es la rutaImagen</th>
                        <th>8</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default TablaDashboard