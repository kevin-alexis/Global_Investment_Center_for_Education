import { Link } from 'react-router-dom'
import './VerticalNav.css'
import BotonDashUsers from '../../assets/BotonDashUsers.png'
import BotonDashCursos from '../../assets/BotonDashCursos.png'
import BotonDashInicio from '../../assets/BotonDashInicio.png'


function VerticalNav() {
    return(
        <>
            <div className='VerticalNavBar VerticalNavBar2'>
                <Link to='/' className='TextoVerticalNav'>GICE</Link>
                <div>
                    <div className='VerticalNavBarBotones'>
                        <Link style={{width:100+ '%'}} to ='/dashboard'><img style={{width:30+ '%'}} src={BotonDashInicio}></img></Link>
                        <Link style={{width:100+ '%'}} to ='/dashboard/cursos'><img style={{width:30+ '%'}} src={BotonDashCursos}></img></Link>
                        <Link style={{width:100+ '%'}} to ='/dashboard/users'><img style={{width:30+ '%'}} src={BotonDashUsers}></img></Link>
                    </div>
                </div>
                <Link to='/' >Hola</Link>
            </div>
        </>
    )
}

export default VerticalNav