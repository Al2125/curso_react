import { useState } from 'react'



import './App.css'

import Header from "./componentes/Header.jsx"
import Footer from "./componentes/Footer.jsx"

import Rutas from "./componentes/Rutas.jsx"
import DetalleProducto from "./componentes/DetalleProducto.jsx"


function App() {
  
  return (
    <> 
      <Header />
      <Rutas />
      <Footer/>
    </>
  )
}

export default App


