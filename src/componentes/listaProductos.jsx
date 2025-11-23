import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useProductosContext } from "../context/ProductosContext.jsx";
import GestionProductos from "./GestionProductos.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

const ListaProductos = () => {
  const { agregarCarrito } = useContext(CarritoContext);
  const { productos, cargando, eliminarProducto } = useProductosContext();
  const { usuario } = useAuthContext();

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;


  const [abrirFormularioEditar, setAbrirFormularioEditar] = useState(null);

  if (cargando) return <p>Cargando productos...</p>;

  const ultimo = paginaActual * productosPorPagina;
  const primero = ultimo - productosPorPagina;
  const productosActuales = productos.slice(primero, ultimo);

  const cantidadPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <>
      {usuario === "admin" && (
        <GestionProductos formularioAbierto={setAbrirFormularioEditar} />
      )}

      <div>
        <h2 className="titulo-productos">Productos</h2>

        <div className="contenedor-productos">
          {productosActuales.map((producto) => (
            <div className="row tarjeta-producto" key={producto.id}>

                    <div className="d-none d-md-block col-md-1 col-lg-2 col-xl-3 bg-dark"></div>

              <div className="col producto">
                <div className="info-producto">
                <h3>{producto.nombre}</h3>

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  width={100}
                  height={100}
                />

                <p><strong>Precio:</strong> ${producto.precio}</p>
                </div>
                
 
                <div className = "col botones-producto">
                  <button onClick={() => agregarCarrito(producto)}>Agregar</button>

                {usuario === "admin" && (
                  <>
                    <button onClick={() => abrirFormularioEditar?.(producto)}>Editar</button>
                    <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </>
                )}

              <Link to={`/producto/${producto.id}`}>
                <button>Ver detalle</button>
              </Link>
              </div>
              </div>

                     <div className="d-none d-md-block col-md-1 col-lg-2 col-xl-3 bg-dark"></div>
            </div>
          ))}
        </div>

        <div className="controles-paginas">
          <button
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual <= 1}
          >
            Anterior
          </button>

          <p>Página {paginaActual} de {cantidadPaginas}</p>

          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual >= cantidadPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default ListaProductos;
