const Contacto = () => {
  return (
    <div class="contacto">
      <h2>Contacto</h2>
      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" />

        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" />

        <br />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribí tu mensaje..." />

        <br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;