import { jwtDecode } from "jwt-decode";
import IncidentList from '../list/IncidentList.js'; 
import Header from '../header/Header.js'; 
import Footer from '../footer/Footer.js'; 
import React, { useState, useEffect } from 'react';
import Form from '../Form.js'; 
import Login from '../Login.js';
import Fondo from '../img/fondopan.jpg'; 

function App() {
  // Configuración de Endpoints
  const URL_REPORTES = 'http://localhost:3004/incidencias';
  const URL_CLIENTES = 'http://localhost:3004/users';
  const URL_ACCESO = 'http://localhost:3004/login'; 

  // Estados de la aplicación
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listadoTickets, setListadoTickets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 

  // Carga inicial de datos
  useEffect(() => {
    const obtenerIncidencias  = async () => {
      try {
        const [resTickets, resUsers] = await Promise.all([
          fetch(URL_REPORTES),
          fetch(URL_CLIENTES)
        ]);

        if (resTickets.ok && resUsers.ok) {
          setListadoTickets(await resTickets.json());
          setListaUsuarios(await resUsers.json());
        }
      } catch (err) {
        console.error("Error en la carga:", err.message);
      }
    };

    obtenerIncidencias();
  }, []);

  // Gestión de sesión persistente
  useEffect(() => {
    const obtenerUsuario = () => {
      const tokenActivo = localStorage.getItem('authToken');
      if (tokenActivo) {
        try {
          const infoToken = jwtDecode(tokenActivo);
          const coincidencias = listaUsuarios.find(u => u.email === infoToken.email);
          if (coincidencias) setCurrentUser(coincidencias);
        } catch (e) {
          localStorage.removeItem('authToken');
        }
      }
    };
    obtenerUsuario();
  }, [listaUsuarios]);

  const finalizarSesion = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  const manejarAutenticacion = async (correo, clave) => {
    try {
      const peticion = await fetch(URL_ACCESO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: clave }) 
      });

      if (peticion.ok) {
        const resultado = await peticion.json();
        localStorage.setItem("authToken", JSON.stringify(resultado["accessToken"]));
        setCurrentUser(resultado.user);
      } else {
        alert("Credenciales incorrectas"); 
      }
    } catch (error) {
      alert("Error de red");
    }
  };

  const registrarNuevoReporte = async (nom, mail, info, cat, urg, sit) => {
    const marcaTemporal = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const propietario = listaUsuarios.find(u => u.email === mail);

    if (!propietario) return alert("Email no registrado");

    const payload = {
      usuario: propietario, 
      titulo: nom,
      descripcion: info,
      categoria: cat,
      nivel_urgencia: urg,
      fecha_registro: marcaTemporal,
      estado: "Abierta",
      ubicacion: sit,
      comentarios: [] 
    };

    try {
      const envio = await fetch(URL_REPORTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (envio.ok) {
        const nuevoItem = await envio.json();
        setListadoTickets(prev => [...prev, nuevoItem]);
      }
    } catch (err) {
      alert("No se pudo guardar");
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <Header />
      {currentUser && (
        <div className="text-end p-3">
          <button className="btn btn-danger" onClick={finalizarSesion}>
            Salir
          </button>
        </div>
      )}
      <h2 className='mb-4 text-center mt-3'>Panel de Gestión</h2>
      <div className="container-fluid mt-4 row justify-content-center">
        {!currentUser ? (
          <aside className='col-md-4'>
            <Login onLogin={manejarAutenticacion} />
          </aside>
        ) : (
          <>
            <main className='col-md-8'>
              <IncidentList incidencias={listadoTickets} />
            </main>
            <aside className='col-md-4'>
              <Form agregarIncidencia={registrarNuevoReporte} />
            </aside>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;