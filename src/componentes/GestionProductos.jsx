import { useProductosContext } from "../context/ProductosContext";
import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";

const GestionProductos = ({ formularioAbierto }) => {
    const { agregarProducto, editarProducto, cargando } = useProductosContext();

    const [modoFormulario, setModoFormulario] = useState("agregar");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const abrirFormularioAgregar = () => {
        setModoFormulario("agregar");
        setProductoSeleccionado(null);
        setMostrarFormulario(true);
    };

    const abrirFormularioEditar = (producto) => {
        setModoFormulario("editar");
        setProductoSeleccionado(producto);
        setMostrarFormulario(true);
    };

    useEffect(() => {
        if (formularioAbierto) {
            formularioAbierto(() => abrirFormularioEditar);
        }
    }, [formularioAbierto]);

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
    };

    if (cargando) return <p>Cargando productos...</p>;

    return (
        <>
            <button onClick={abrirFormularioAgregar}>Agregar producto</button>

            {mostrarFormulario && (
                <div className="modal">
                    <div className="modal-formulario">
                        <FormProducto
                            modo={modoFormulario}
                            producto={productoSeleccionado}
                            onAgregar={agregarProducto}
                            onEditar={editarProducto}
                            onCerrar={cerrarFormulario}
                        />

                        <button onClick={cerrarFormulario}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default GestionProductos;
