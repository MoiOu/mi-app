import React, { useEffect, useState } from 'react';
import MiLista from '../lista/IncidentList';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Form from '../Form';
import Login from '../Login.js'; // Ruta corregida: sube un nivel a /components/
import Fondo from '../img/fondopan.jpg';

function App() {
    // Constantes de la API
    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    const LOGIN_API_URL = 'http://localhost:3004/login';

    // Estados
    const [incidencias, setIncidencias] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    // Efecto inicial: Carga incidencias y recupera sesión del localStorage [cite: 305]
    useEffect(() => {
        const obtenerIncidencias = async () => {
            try {
                let response = await fetch(INCIDENCIA_API_URL);
                if (!response.ok) throw new Error("Error al obtener incidencias");
                const data = await response.json();
                setIncidencias(data);
            } catch (e) {
                console.error("Error de conexión:", e);
            }
        };

        // Persistencia: Comprobamos si hay un usuario en el almacenamiento local [cite: 305]
        const sesionGuardada = localStorage.getItem('usuarioLogueado');
        if (sesionGuardada) {
            setUsuarioLogueado(JSON.parse(sesionGuardada));
        }

        obtenerIncidencias();
    }, []);

    // Función de Login [cite: 32, 34]
    const onLogin = async (email, password) => {
        try {
            const response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Guardamos en el estado y en localStorage para persistencia [cite: 55, 305]
                setUsuarioLogueado(data.user);
                localStorage.setItem('usuarioLogueado', JSON.stringify(data.user));
            } else {
                // Manejo de errores según la práctica [cite: 63]
                const errorData = await response.json();
                alert(`Fallo de autenticación. Error: ${response.status}: ${errorData}`);
            }
        } catch (e) {
            console.error("Error en la petición de login:", e);
            alert("No se pudo conectar con el servidor. Verifica que json-server esté activo.");
        }
    };

    // Función para cerrar sesión (Opcional, pero recomendada)
    const onLogout = () => {
        setUsuarioLogueado(null);
        localStorage.removeItem('usuarioLogueado');
    };

    const agregarIncidencia = (titulo_nuevo, usuario_input, descripcion_nuevo, categoria_nuevo, nivel_urgencia_nuevo, ubicacion_nuevo) => {
        const fecha = new Date();
        const fecha_formateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

        const nueva_incidencia = {
            id: incidencias.length + 1,
            usuario: usuario_input,
            titulo: titulo_nuevo,
            descripcion: descripcion_nuevo,
            categoria: categoria_nuevo,
            nivel_urgencia: nivel_urgencia_nuevo,
            ubicacion: ubicacion_nuevo,
            fecha_registro: fecha_formateada,
            estado: "Abierta"
        };

        setIncidencias([...incidencias, nueva_incidencia]);
    };

    return (
        <div style={{ 
            backgroundImage: `url(${Fondo})`, 
            backgroundSize: "cover", 
            minHeight: '100vh',
            backgroundAttachment: 'fixed' 
        }}>
            <Header />
            
            <div className="container py-5">
                {/* Operador Ternario para control de acceso [cite: 99, 102] */}
                {!usuarioLogueado ? (
                    <div className="row justify-content-center">
                        <aside className="col-md-5">
                            <Login onLogin={onLogin} />
                        </aside>
                    </div>
                ) : (
                    <div className="row">
                        <main className="col-md-7">
                            <div className="d-flex justify-content-between align-items-center mb-3 bg-dark text-white p-2 rounded">
                                <span>Bienvenido, <strong>{usuarioLogueado.nombre}</strong></span>
                                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Cerrar Sesión</button>
                            </div>
                            <MiLista incidencias={incidencias} />
                        </main>
                        <aside className="col-md-5">
                            <Form agregarIncidencia={agregarIncidencia} />
                        </aside>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default App;