
import  MiLista from '../lista/IncidentList.js';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import React, { useEffect, useState } from 'react';
import Form from '../Form.js';
import Fondo from '../img/fondopan.jpg'


function App() {

    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    const USUARIO_API_URL = 'http://localhost:3004/users';

    const [usuarios, setUsuarios] = useState([]);
    const [incidencias, setIncidencias] = useState([]);

    useEffect(() => {

    const obtenerIncidencias = async () => {
        try {
            let response = await fetch(INCIDENCIA_API_URL);
        if (!response.ok) {
                throw new Error("HTTP Error");
            }
            const data = await response.json();
            console.log(data);
            setIncidencias(data);
        } catch (e) {
            console.error("Error al cargar las incidencias:", e);
        }
    };

    const obtenerUsuarios = async () => {
        try {
            let response = await fetch(USUARIO_API_URL);
                if (!response.ok) {
                    throw new Error("HTTP Error");
            }
                const data = await response.json();
                console.log(data);
                 setUsuarios(data);
            } catch (e) {
                 console.error("Error al cargar los usuarios:", e);
            }
        };

        obtenerIncidencias();
        obtenerUsuarios();

    }, []);
    
    const agregarIncidencia = (
        titulo_nuevo,
        usuario_input,
        descripcion_nuevo,
        categoria_nuevo,
        nivel_urgencia_nuevo,
        ubicacion_nuevo
    ) => {

        const fecha = new Date();
         const year = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        const fecha_formateada = `${year}-${mes}-${dia}`;

        let usuarioCompleto = null;
        const inputEmail = usuario_input.email ? usuario_input.email.toLowerCase().trim() : '';

        if (inputEmail) {
            usuarioCompleto = usuarios.find(u => 
                u.email && u.email.toLowerCase() === inputEmail
            );
        }

        let usuario_para_guardar;
        if (usuarioCompleto) {
         usuario_para_guardar = usuarioCompleto;
        }
        
        const nueva_incidencia = {
    id: incidencias.length + 1,
    usuario: usuario_input, 
    titulo: titulo_nuevo,
    descripcion: descripcion_nuevo,
    categoria: categoria_nuevo,
    nivel_urgencia: nivel_urgencia_nuevo,
    ubicacion: ubicacion_nuevo,
    fecha_registro: fecha_formateada,
    estado: "Abierto"
};


    setIncidencias([...incidencias, nueva_incidencia]);
    };
  return (
    
    <div className="card" style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>

    <Header/>
    <h2 className='mb-4 text-center '>Mi aplicacion </h2>
     
    <div className="container-fluid mt 4 row">
      <main className='col-md-6 '>
        <p>Esta aplicacion muestra el contenido almacenado de mi app</p>
          <MiLista incidencias={incidencias}/>
          </main>
        <aside className='col-md-6 '>
       <Form agregarIncidencia={agregarIncidencia}/>
        </aside>
    </div>
    <Footer/>
    </div>

  );
}


export default App;
