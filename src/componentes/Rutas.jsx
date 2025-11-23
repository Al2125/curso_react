import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Inicio from "./Inicio.jsx";
import Contacto from "./Contacto.jsx";
import DetalleProducto from "./DetalleProducto.jsx";

import Login from "./Login.jsx"
import RutaProtegida from './RutaProtegida.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';



function Rutas() {
  const { usuario, logout } = useAuthContext();
    const navigate = useNavigate();
  const iniciarSesion = () => navigate("/login");
  //const cerrarSesion = () => setUsuario(null);

    

  return (
    <>
    
    <Routes>
      <Route path={'/'} element={<Inicio />} />
      <Route path={'/contacto'} element={<Contacto />} />
      <Route path={'/producto/:id'} element={<DetalleProducto />} />
      
      <Route path={'/login'} element={<Login />} />
    </Routes>
    </>
  );
}
export default Rutas


//<Route path={'/admin'} element={
//        <RutaProtegida estaAutenticado={!usuario}>
//          <Admin />
//        </RutaProtegida>
//        }
///>