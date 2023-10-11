import React, { useEffect, useState } from "react";
import UsuarioIndividual from "./UsuarioIndividual";
import axios from 'axios'; 

function ListaUsuarios() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/usuario/obtenerusuarios')
      .then(res => {
        setDataUsuarios(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error en la solicitud:", err);
        setError(err);
        setIsLoading(false);
      });
  }, []); 

  if (isLoading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error">Error al cargar usuarios: {error.message}</div>;
  }
  const listaUsuarios = dataUsuarios.map(usuario => (
    <div key={usuario.id}>
      <UsuarioIndividual usuario={usuario} />
    </div>
  ));
  

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {listaUsuarios}
    </div>
  );
}

export default ListaUsuarios;
