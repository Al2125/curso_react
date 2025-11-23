import { createContext, useState } from 'react';
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
export const CarritoContext = createContext();

export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState([]);
    const { usuario } = useAuthContext();
    const navigate = useNavigate()

    // Eliminar por ID
    const eliminarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(producto => producto.id !== id));
    };

    // Agregar producto
    const agregarCarrito = (producto) => {
        if (!usuario) {
                navigate('/login');
            }
        else
            {setCarrito(prev => [...prev, producto]);}
    };

    // Vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider 
            value={{ 
                carrito, 
                setCarrito, 
                eliminarDelCarrito, 
                agregarCarrito, 
                vaciarCarrito 
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export default CarritoProvider;