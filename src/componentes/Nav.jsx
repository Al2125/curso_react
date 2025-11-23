import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useContext } from 'react';

const Nav  = () => {
    const {usuario, logout} = useAuthContext();
    const { vaciarCarrito  } = useContext(CarritoContext);

    const cerrarSesion = () => {
        logout();
        vaciarCarrito();
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 sticky-top">
         <Link className="navbar-brand" to="/">Curso React 2025</Link>   

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#barra-navegacion"
            >
            <span className="navbar-toggler-icon"></span>
        </button>   

        <div className="collapse navbar-collapse" id="barra-navegacion">
            <ul className="navbar-nav ms-md-auto">

                <li className="nav-item">
                <Link className="nav-link" to={'/'}>Inicio</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to={'/contacto'}>Contacto</Link>
                </li>

                <li className="nav-item">
                {usuario ? 
                <button className="btn btn-outline-light ms-2" onClick={cerrarSesion}>
                    Cerrar Sesión
                </button> :
                <Link className="nav-link" to={'/login'}><button className="btn btn-outline-light ms-2">
                    iniciar Sesion
                </button></Link>
                }
                </li>
            </ul>
         </div>       
            
        </nav>
    )
}

export default Nav