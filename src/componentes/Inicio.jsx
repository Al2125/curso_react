import { useContext, useEffect } from "react";
import ListaProductos from "./listaProductos";
import Carrito from "./Carrito";
import { CarritoContext } from "../context/CarritoContext.jsx";
import GestionProductos from "./GestionProductos.jsx";
const Inicio = () => {
  const { carrito, agregarCarrito, vaciarCarrito, setCarrito } = useContext(CarritoContext);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, [setCarrito]);


  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <>

      <ListaProductos agregarCarrito={agregarCarrito} />
      <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} />
    </>
  );
};

export default Inicio;