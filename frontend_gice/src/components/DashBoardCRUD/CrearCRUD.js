import { useState } from "react"

function CrearCRUD({ titulo, setOpen }) {
    const [tituloCurs, setTituloCurs] = useState('');   
    const [desCurs, setDesCurs] = useState('');
    const [imgCurs, setImgCurs] = useState(null);   
    const [docuCurs, setDocuCurs] = useState(null);
    const [nomUsua, setNomUsua] = useState('');
    const [correoUsua, setCorreoUsua] = useState('');
    const [contraUsua, setContraUsua] = useState('');

    const crearUsuario = async (e) => {
        e.preventDefault();
        if (titulo == 'Users') {

                const URL = 'http://localhost:8080/usuarios';
    
                try {
                    const object = {
                      nombre: nomUsua,
                      correoElectronico: correoUsua,
                      pass: contraUsua,
                      idTipoUsuarioId: 2
                    };
                    console.log(object);
                    
                    const requestOptionsAgregar = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(object)
                    };
                  9981799792
                    const response = await fetch(URL, requestOptionsAgregar);
                    const data = await response.json();
                    console.log(data);
                    console.log('agregado');
                    setOpen(false);
                  } catch (error) {
                    console.error(error);
                    console.log('error');
                  }
            
        } else if (titulo == 'Cursos') {

                const URL = 'http://localhost:8080/cursos';
                const formData = new FormData();
                formData.append('titulo', tituloCurs);
                formData.append('descripcion', desCurs);
                formData.append('rutaDocumento', docuCurs);
                formData.append('rutaImagen', imgCurs);
    
                const requestOptionsAgregar = {
                    method: 'POST',
                    body: formData
                };
    
                await fetch(URL, requestOptionsAgregar)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        console.log('agregado');
                        setOpen(false);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            
        }
    }

    const CancelarAccion = () => {
        setOpen(false)
    }


    return (
        <>
            <div className="DashBoardComponente">
                <div className='DashBoardCRUDBody'>
                    <h1 className='DashBoardCRUDTittle'>Dashboard</h1>
                    <div className="DashBoardEditCrear">
                        <h2>Crear {titulo}</h2>
                        {
                            titulo == 'Cursos' ?
                                <form onSubmit={crearUsuario}>
                                    <label htmlFor="titulo">
                                        Titulo
                                    </label>
                                    <input
                                        onChange={(e) => setTituloCurs(e.target.value)} value={tituloCurs} id="titulo">
                                    </input>

                                    <label htmlFor="descripcion">
                                        Descripcion
                                    </label>
                                    <input
                                       onChange={(e) => setDesCurs(e.target.value)} value={desCurs} id="descripcion">
                                    </input>

                                    <label htmlFor="imagen">
                                        Imagen
                                    </label>
                                    <input
                                        type="file" onChange={(e) => setImgCurs(e.target.value)} value={imgCurs} id="imagen">
                                    </input>

                                    <label htmlFor="documento">
                                        Documento
                                    </label>
                                    <input 
                                        accept=".pdf" type="file" onChange={(e) => setDocuCurs(e.target.value)} value={docuCurs} id="documento">
                                    </input>

                                <div className="EditCrearBotones">
                                    <button className="crear" type="submit" onClick={crearUsuario}> Crear</button>
                                    <button id="cancelar"  onClick={CancelarAccion}>Cancelar</button>
                                </div>

                                </form>
                                :
                                <form onSubmit={crearUsuario}>
                                    <label htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input
                                        onChange={(e) => setNomUsua(e.target.value)} value={nomUsua} id="nombre">
                                    </input>

                                    <label htmlFor="correo">
                                        Correo Electronico
                                    </label>
                                    <input 
                                        onChange={(e) => setCorreoUsua(e.target.value)} value={correoUsua} id="correo">
                                    </input>

                                    <label htmlFor="contraseña">
                                        Contraseña
                                    </label>
                                    <input 
                                        type="password" onChange={(e) => setContraUsua(e.target.value)} value={contraUsua} id="password">
                                    </input>

                                    <div className="EditCrearBotones">
                                        <button className="crear" type="submit" onClick={crearUsuario}> Crear</button>
                                        <button id="cancelar" onClick={CancelarAccion}>Cancelar</button>
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