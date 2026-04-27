import { jwtDecode } from "jwt-decode";
import IncidentList from '../list/IncidentList.js'; 
import Header from '../header/Header.js'; 
import Footer from '../footer/Footer.js'; 
import React, { useState, useEffect } from 'react';
import Form from '../Form.js'; 
import Login from '../Login.js';
import Fondo from '../img/fondopan.jpg'; 

function App() {
  const INCIDENCIA_API = 'http://localhost:3004/incidencias';
  const USUARIO_API = 'http://localhost:3004/users';
  const LOGIN_API_URL = 'http://localhost:3004/login'; 

  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null); 

  useEffect(() => {
    const obtenerIncidencias = async () => {
      try {
        let response = await fetch(INCIDENCIA_API);
        if (!response.ok) throw new Error("Error al obtener incidencias");
        const data = await response.json();
        setIncidencias(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    const obtenerUsuarios = async () => {
      try {
        let response = await fetch(USUARIO_API);
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    obtenerIncidencias();
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const obtenerUsuarioLogueado = () => {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        try {
          const decodedUser = jwtDecode(savedToken);
          if (decodedUser) {
            const user = usuarios.find((u) => u.email === decodedUser.email);
            if (user) {
              setUsuarioLogueado(user);
            }
          }
        } catch (error) {
          localStorage.removeItem('authToken');
        }
      }
    };
    obtenerUsuarioLogueado();
  }, [usuarios]);

  const cerrarSesion = () => {
    localStorage.removeItem('authToken');
    setUsuarioLogueado(null);
  };

  const onLogin = async (email, password) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }) 
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("authToken", JSON.stringify(userData["accessToken"]));
        setUsuarioLogueado(userData.user);
      } else {
        const errorData = await response.json();
        alert(`Fallo de autenticación. Error: ${response.status}: ${errorData}`); 
      }
    } catch (error) {
      console.error(error);
      alert("Fallo de conexión con el servidor");
    }
  };

  const agregarIncidencia = async (titulo_nuevo, email_usuario_nuevo, descripcion_nuevo, categoria_nuevo, nivel_urgencia_nuevo, ubicacion_nuevo) => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const fecha_formateada = `${year}-${month}-${day}`;

    let usuarioEncontrado = usuarios.find((u) => u.email === email_usuario_nuevo);

    if (usuarioEncontrado) {
      const nueva_incidencia = {
        usuario: usuarioEncontrado, 
        titulo: titulo_nuevo,
        descripcion: descripcion_nuevo,
        categoria: categoria_nuevo,
        nivel_urgencia: nivel_urgencia_nuevo,
        fecha_registro: fecha_formateada,
        estado: "Abierta",
        ubicacion: ubicacion_nuevo,
        comentarios: [] 
      };

      try {
        let response = await fetch(INCIDENCIA_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nueva_incidencia)
        });

        if (!response.ok) {
          throw new Error(`Fallo de la petición POST. Estado: ${response.status}`);
        }

        let data = await response.json();
        setIncidencias([...incidencias, data]);

      } catch (e) {
        console.error(e);
        alert("Error al guardar en el servidor");
      }

    } else {
      alert("No se puede crear incidencia. Usuario no encontrado (Verifica el email).");
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <Header />
      {usuarioLogueado && (
        <div className="text-end p-3">
          <button className="btn btn-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      )}
      <h2 className='mb-4 text-center mt-3'>Mi aplicación</h2>
      <div className="container-fluid mt-4 row justify-content-center">
        {!usuarioLogueado ? (
          <aside className='col-md-4'>
            <Login onLogin={onLogin} />
          </aside>
        ) : (
          <>
            <main className='col-md-8'>
              <IncidentList incidencias={incidencias} />
            </main>
            <aside className='col-md-4'>
              <Form agregarIncidencia={agregarIncidencia} />
            </aside>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;