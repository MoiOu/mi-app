import { Link } from "react-router-dom";

function Menu({ currentUser, setCurrentUser }) {
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <div className="menu-container mb-4">
      <h2 className="text-center mb-3">Mi aplicación</h2>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border shadow-sm rounded">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Menú</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/incidencias">Ver incidencias</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registrar">Registrar incidencia</Link></li>
              {currentUser?.rol?.nombre_rol === "admin" && (
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Gestión Usuarios</Link></li>
              )}
              <li className="nav-item">
                <button className="nav-link btn btn-link text-decoration-none" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;