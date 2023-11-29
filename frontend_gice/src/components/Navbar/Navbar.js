import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import loginIcon from "../../assets/loginIcon.png"

const Navbar = ({setShow, show}) => {

    function showHamburger() {
        setShow(!show)
    }

    const [isLoged, setIsLoged] = useState(false)

    const [currentPath, setCurrentPath] = useState('');
    const location = useLocation();

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    useEffect(()=>{
        if(localStorage.auth){
            setIsLoged(true)
        }
    },[localStorage])

    return (
        <nav>
            <div className='navbar-mobileContainer'>  
                {show ? 
                <div className='hamburger'>
                    <div onClick={showHamburger} className='close'>X</div>
                    <ul>
                            <>
                                <li>
                                    <Link to="/" onClick={showHamburger}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/noticias" onClick={showHamburger}>Noticias</Link>
                                </li>
                                <li>
                                    <Link to="/divisas" onClick={showHamburger}>Divisas</Link>
                                </li>
                                <li>
                                    <Link to="/criptomonedas" onClick={showHamburger}>Criptomonedas</Link>
                                </li>
                                {
                                    isLoged?
                                    <li>
                                        <Link to="/curso" onClick={showHamburger}>Curso</Link>
                                    </li>:
                                null
                                }
                                
                            </>
                    </ul>
                </div> :       
                <div className='navbar-mobile'>
                    <div className='leftNav'>
                    <Link onClick={showHamburger} className='hamburguer'>
                        <h1>GICE</h1>
                    </Link>
                    </div>
                    <div className='rightNavbar'>
                        <ul>
                        {
                            isLoged?
                           <>
                            <Link to="/login" className='loginLinK'>
                                <button className='logOutButton' onClick={()=>{
                                    localStorage.clear()
                                    window.location.reload();
                                }}>LOG OUT</button>
                            </Link>
                           </>
                            :
                            <Link to="/login" className='loginLinK'>
                                <img src={loginIcon} className='loginIcon'></img>
                            </Link>
                            }
                        </ul>
                    </div>
                </div>
                }
            </div>
            <div className='navbar-desktop'>
                <div className='leftNav'>
                    <Link to="/">
                        <h1>GICE</h1>
                    </Link>
                </div>
                <div className='rightNavbar'>
                    <ul>
                            <>
                                <li className={currentPath === '/noticias' ? 'active' : ''}>
                                    <Link to="/noticias">Noticias</Link>
                                </li>
                                <li className={currentPath === '/divisas' ? 'active' : ''}>
                                    <Link to="/divisas">Divisas</Link>
                                </li>
                                <li className={currentPath === '/criptomonedas' ? 'active' : ''}>
                                    <Link to="/criptomonedas">Criptomonedas</Link>
                                </li>
                            </>

                            {
                                isLoged?
                                <>
                                    <li className={currentPath === '/curso' ? 'active' : ''}>
                                        <Link to="/curso">Curso</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className='loginLinK'>
                                            <button className='logOutButton' onClick={()=>{
                                            localStorage.clear()
                                            window.location.reload();
                                        }}>LOG OUT</button>
                                        </Link>
                                    </li>
                                </>
                                :
                                <li>
                                    <Link to="/login" className='loginLinK'>
                                        <img src={loginIcon} className='loginIcon'></img>
                                    </Link>
                                </li>
                            }
                            
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
