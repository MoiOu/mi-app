import { useContext } from "react";
import { authContext } from "./AppExamen";
import {Link} from "react-router-dom";  


function Menu() {
  const {usuarioLogin} = useContext(authContext);

  return (
    <div className="menu">
        <p>Sesion de {usuarioLogin.nombre}</p>
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/tareas">Ver listado de Tareas</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
            </ul>
        </nav>
    </div>
  );
}export default Menu;