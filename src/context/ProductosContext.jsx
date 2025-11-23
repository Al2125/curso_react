

import { createContext, useState, useEffect, useContext } from "react";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://690f6e0e45e65ab24ac3cdab.mockapi.io/productos");
            if (!respuesta.ok) throw new Error("Error al cargar productos");
            const data = await respuesta.json();
            setProductos(data);
        } catch (error) {
            setError(error);
        } finally {
            setCargando(false);
        }
    };

    const agregarProducto = async (producto) => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://690f6e0e45e65ab24ac3cdab.mockapi.io/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error("Error al agregar producto");

            const nuevoProducto = await respuesta.json();
            setProductos((prev) => [...prev, nuevoProducto]);
        } catch (error) {
            alert("Error al agregar el producto");
        } finally {
            setCargando(false);
        }
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Está seguro?");
        if (!confirmar) return;

        try {
            const respuesta = await fetch(
                `https://690f6e0e45e65ab24ac3cdab.mockapi.io/productos/${id}`,
                { method: "DELETE" }
            );

            if (!respuesta.ok) throw new Error("Error al eliminar");

            setProductos((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            alert("Error al eliminar el producto");
        }
    };

    const editarProducto = async (producto) => {
        try {
            const respuesta = await fetch(
                `https://690f6e0e45e65ab24ac3cdab.mockapi.io/productos/${producto.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(producto),
                }
            );

            if (!respuesta.ok) throw new Error("Error al actualizar");

            const actualizado = await respuesta.json();

            setProductos((prev) =>
                prev.map((p) => (p.id === actualizado.id ? actualizado : p))
            );
        } catch (error) {
            alert("Error al actualizar el producto");
        }
    };

    return (
        <ProductosContext.Provider
            value={{
                productos,
                cargando,
                error,
                cargarProductos,
                agregarProducto,
                editarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
};

export const useProductosContext = () => useContext(ProductosContext);