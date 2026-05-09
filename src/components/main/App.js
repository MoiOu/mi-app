import { jwtDecode } from "jwt-decode";
import IncidentList from '../list/IncidentList.js'; 
import Header from '../header/Header.js'; 
import Footer from '../footer/Footer.js'; 
import React, { useState, useEffect } from 'react';
import Form from '../Form.js'; 
import Login from '../Login.js';
import Fondo from '../img/fondopan.jpg'; 
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./MenuActividad.js"; 
import UserRoleManagement from './UserRoleManagement.js';

function App() {
  const URL_REPORTES = 'http://localhost:3004/incidencias';
  const URL_CLIENTES = 'http://localhost:3004/users';
  const URL_ACCESO = 'http://localhost:3004/login'; 

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listadoTickets, setListadoTickets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const obtenerIncidencias = async () => {
      try {
        const resTickets = await fetch(URL_REPORTES);
        const dataTickets = await resTickets.json();
        setListadoTickets(dataTickets);

        const resUsers = await fetch(URL_CLIENTES);
        const dataUsers = await resUsers.json();
        setListaUsuarios(dataUsers);
      } catch (err) {
        console.error("Error en la carga:", err.message);
      }
    };
    obtenerIncidencias();
  }, []);

  useEffect(() => {
    const obtenerUsuario = () => {
      const tokenActivo = localStorage.getItem('authToken');
      if (tokenActivo && listaUsuarios.length > 0) {
        try {
          const infoToken = jwtDecode(tokenActivo);
          const coincidencias = listaUsuarios.find(u => u.email === infoToken.email);
          if (coincidencias) {
            setCurrentUser(coincidencias);
          }
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
        localStorage.setItem("authToken", resultado.accessToken);
        setCurrentUser(resultado.user);
      } else {
        alert("Credenciales incorrectas"); 
      }
    } catch (error) {
      alert("Error de red");
    }
  };

  const registrarNuevoReporte = async (nom, mail, info, cat, urg, sit) => {
    const fecha_registro = new Date().toISOString().split('T')[0];
    const usuario = listaUsuarios.find(u => u.email === mail);
    const nuevaIncidencia = {
      usuario: usuario || { email: mail },
      titulo: nom,
      descripcion: info,
      categoria: cat,
      nivel_urgencia: urg,
      fecha_registro: fecha_registro,
      estado: "Abierta",
      ubicacion: sit,
      comentarios: []
    };

    try {
      const response = await fetch(URL_REPORTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaIncidencia)
      });
      if (response.ok) {
        const data = await response.json();
        setListadoTickets([...listadoTickets, data]);
      }
    } catch (error) {
      alert("Error al realizar la petición POST");
    }
  };

  const manejarCierreIncidencia = async (id) => {
    try {
      const response = await fetch(`${URL_REPORTES}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: "Cerrada" })
      });
      if (response.ok) {
        setListadoTickets(listadoTickets.map(inc => 
          inc.id === id ? { ...inc, estado: "Cerrada" } : inc
        ));
      }
    } catch (error) {
      alert("Error al cerrar la incidencia");
    }
  };

  const crearUsuario = async (nuevoU) => {
    try {
      const res = await fetch(URL_CLIENTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoU)
      });
      if (res.ok) {
        const data = await res.json();
        setListaUsuarios([...listaUsuarios, data]);
      }
    } catch (error) {
      alert("Error al crear usuario");
    }
  };

  const cambiarRolUsuario = async (usuario) => {
    const nuevoRol = usuario.rol?.nombre_rol === "admin" 
      ? { id: 2, nombre_rol: "usuario" } 
      : { id: 1, nombre_rol: "admin" };

    try {
      const res = await fetch(`${URL_CLIENTES}/${usuario.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: nuevoRol })
      });

      if (res.ok) {
        setListaUsuarios(listaUsuarios.map(u => 
          u.id === usuario.id ? { ...u, rol: nuevoRol } : u
        ));
      }
    } catch (error) {
      alert("Error al cambiar el rol");
    }
  };

  return (
    <div className="card" style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <Header />
      {currentUser && <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} finalizarSesion={finalizarSesion} />}
      <div className="container-fluid mt-4">
        {!currentUser ? (
          <div className="row justify-content-center">
            <aside className='col-md-4'>
              <Login onLogin={manejarAutenticacion} />
            </aside>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={
              <div className="text-center p-5 bg-white rounded shadow-sm mx-auto" style={{maxWidth: '600px'}}>
                <h3>Bienvenido, {currentUser.nombre}</h3>
                <p>Seleccione una opción del menú para gestionar el sistema.</p>
              </div>
            } />
            <Route path="/incidencias" element={
              <div className="row justify-content-center">
                <main className='col-md-10'>
                  <IncidentList 
                    incidencias={listadoTickets} 
                    user={currentUser} 
                    onCerrar={manejarCierreIncidencia} 
                  />
                </main>
              </div>
            } />
            <Route path="/registrar" element={
              <div className="row justify-content-center">
                <aside className='col-md-6'>
                  <Form agregarIncidencia={registrarNuevoReporte} />
                </aside>
              </div>
            } />
            <Route path="/usuarios" element={
              <UserRoleManagement 
                usuarios={listaUsuarios} 
                onCambiarRol={cambiarRolUsuario}
                onCrearUsuario={crearUsuario}
              />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;