import SimboloDescarga from '../../assets/SimboloDescarga.png';
import './BloqueDashHome.css'
function BloqueDashHome({ imagen, tittle, text, color, onClick, titulo, setAbrirNuevo }) {

    return (
        <>
            <div className={"DashboardOptionsBloques"} onClick={onClick} style={{cursor: onClick?'pointer':null}}>
                <div className='DashHomeObjetoColor' style={{ backgroundColor:`rgba(${color},0.3)` }}>
                    <img className='SimboloDashHome' src={imagen} onClick={onClick}/>

                </div>
                <div className='DashHomeTexto'>
                    <h3 className={onClick?"titleBloqueDash isHover":"titleBloqueDash"}>{tittle}</h3>
                    <p className='textBloqueDash'>{text}</p>
                </div>
            </div>
        </>
    )
}

export default BloqueDashHome