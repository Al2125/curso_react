import { useState, useEffect } from "react";

const FormProducto = ({ modo, producto, onAgregar, onEditar, onCerrar }) => {
  const [errores, setErrores] = useState({});
  const [datosProducto, setdatosProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
  });

  useEffect(() => {
    if (modo === "editar" && producto) {
      setdatosProducto({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        id: producto.id, // necesario para PUT
      });
    } else {
      setdatosProducto({
        nombre: "",
        precio: "",
        imagen: "",
        descripcion: "",
      });
    }
  }, [modo, producto]);

  const manejarChange = (evento) => {
    const { name, value } = evento.target;

    setdatosProducto({
      ...datosProducto,
      [name]: name === "precio" ? Number(value) : value,
    });
  };

  const validarForm = () => {
    const nuevosErrores = {};

    if (!datosProducto.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio";

    if (!datosProducto.precio || datosProducto.precio <= 0)
      nuevosErrores.precio = "El precio debe ser mayor a 0";

    if (!datosProducto.imagen.trim() || datosProducto.imagen.length < 6)
      nuevosErrores.imagen = "Debe subir una URL de imagen válida";

    if (!datosProducto.descripcion.trim() || datosProducto.descripcion.length < 10)
      nuevosErrores.descripcion =
        "La descripción debe tener al menos 10 caracteres";

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    if (!validarForm()) return;

    if (modo === "agregar") {
      onAgregar(datosProducto);
    } else {
      onEditar(datosProducto);
    }

    onCerrar();
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>{modo === "agregar" ? "Agregar producto" : "Editar producto"}</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={datosProducto.nombre}
          onChange={manejarChange}
        />
        {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={datosProducto.precio}
          onChange={manejarChange}
        />
        {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}
      </div>

      <div>
        <label>URL de imagen:</label>
        <input
          type="text"
          name="imagen"
          value={datosProducto.imagen}
          onChange={manejarChange}
        />
        {errores.imagen && <p style={{ color: "red" }}>{errores.imagen}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={datosProducto.descripcion}
          onChange={manejarChange}
        />
        {errores.descripcion && (
          <p style={{ color: "red" }}>{errores.descripcion}</p>
        )}
      </div>

      <button type="submit">
        {modo === "agregar" ? "Agregar" : "Guardar cambios"}
      </button>
    </form>
  );
};

export default FormProducto;
