import { useState } from "react"
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import Inicio from "./Inicio";

const Login = () => {
    const [usuario,setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const { login } = useAuthContext()
    const navigate = useNavigate()



const manejarSubmit = (evento) => {
    evento.preventDefault();

    const usuariosValidos = (
        (usuario === 'admin' && contrasenia === '1234') ||
        (usuario === 'usuario' && contrasenia === '1234')
    );

    if (usuariosValidos) {
        login(usuario);
        navigate('/');
    } else {
        alert('Usuario o contraseña inválido');
    }
};

    return(
        <div className= "form-login">
    <h1>Login</h1>
    <form onSubmit={manejarSubmit}>
        <h3>Iniciar sesión</h3>
        <div className = "usuarios-validos">
            <p>Admin: Usuario: admin / Contraseña: 1234</p>
            <p>Usuario común: Usuario: usuario / Contraseña: 1234</p>
        </div>
        <label htmlFor=''>Usuario</label>
        <input 
        type='text'
        value={usuario}
        onChange={(evento) => setUsuario(evento.target.value)}
        />
        <label htmlFor=''>Contraseña</label>
        <input 
        type='password'
        value={contrasenia}
        onChange={(evento) => setContrasenia(evento.target.value)}
        />
        <button type='submit'>Iniciar Sesión</button>
    </form>
    </div>
    )
}
export default Login