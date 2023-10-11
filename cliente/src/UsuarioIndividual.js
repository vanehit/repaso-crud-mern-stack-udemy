import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UsuarioIndividual({ usuario }) {

const navegar = useNavigate();

//funcion para borrar usuario
function borrarusuario(idusuario){

  
   axios
   .post(`http://localhost:5000/api/usuario/borrarusuario`, { idusuario: idusuario })
   .then((res) => {
     console.log(res.data[0])
     alert(res.data)
     navegar(0);
    
   })
   .catch((err) => {
     console.error("Error en la solicitud:", err);
       });

}

  return (
    <div className="container">
      <div className="row">

        <div className="col-sm-6 offset-3">
            <ul className="list-group">
                <li className="list-group-item">
                    <strong>ID:</strong> {usuario.idusuario}
                </li>
                <li className="list-group-item">
                    <strong>Nombre:</strong> {usuario.nombre}
                </li>
                <li className="list-group-item">
                    <strong>Email:</strong> {usuario.email}
                </li>
                <li className="list-group-item">
                    <strong>Teléfono:</strong> {usuario.telefono}
                </li>
            </ul>

           { /*<button className="btn btn-success">Editar</button>*/}
            <Link to={`/editarusuario/${usuario.idusuario}`}><li className="btn btn-success">Editar</li></Link>

            <button className="btn btn-danger" onClick={()=>{borrarusuario(usuario.idusuario)}}>Borrar</button>

            <hr className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default UsuarioIndividual;
