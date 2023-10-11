import React, { useState } from "react";
import uniquid from 'uniqid';
import axios from 'axios'

function AgregarUsuario() {
  // Hooks de React
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function agregarUsuario() {
    // Validar campos
    if (!nombre || !email || !telefono) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    let usuario = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      idusuario: uniquid()
    }

    console.log("Enviando solicitud al servidor:", usuario);

    axios.post('http://localhost:5000/api/usuario/agregarusuario', usuario)
      .then(res => {
        console.log("Respuesta del servidor:", res.data);
        setSuccessMessage("Usuario agregado exitosamente");
        // Limpiar los campos después del éxito
        setNombre("");
        setEmail("");
        setTelefono("");
      })
      .catch(err => {
        console.error("Error en la solicitud:", err);
        setErrorMessage("Error al agregar el usuario");
      });
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="mt-4">Agregar usuario</h2>
      </div>
      <div className="row">
        <div className="col-sm-6 offset-3">
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value) }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => { setTelefono(e.target.value) }} />
          </div>

          <button onClick={agregarUsuario} className="btn btn-success">Guardar Usuario</button>

        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
