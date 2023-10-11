import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditarUsuario() {
  const params = useParams();

  // Estados para los campos de usuario y los mensajes
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener datos del usuario y establecer estados
    axios
      .post(`http://localhost:5000/api/usuario/obtenerdatausuario`, { idusuario: params.idusuario })
      .then((res) => {
        const dataUsuario = res.data[0];
        setNombre(dataUsuario.nombre);
        setEmail(dataUsuario.email);
        setTelefono(dataUsuario.telefono);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
        setIsLoading(false);
      });
  }, [params.idusuario]);

  // Objeto para actualizar el usuario
  const actualizarUsuario = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    idusuario: params.idusuario
  };

  // Función para manejar la actualización del usuario
  const handleActualizarUsuario = () => {
    axios
      .post(`http://localhost:5000/api/usuario/actualizarusuario`, actualizarUsuario)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message); // Mensaje de éxito
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Editar usuario</h2>
      <h3>El ID del usuario es: {params.idusuario}</h3>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <form>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleActualizarUsuario} className="btn btn-success">
            Actualizar Usuario
          </button>
        </form>
      )}
    </div>
  );
}

export default EditarUsuario;
