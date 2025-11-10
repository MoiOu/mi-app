import './App.css';
import  MiLista from '../list/Milista';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import React from 'react';
import Form from '../Form.js';

class App extends React.Component {
  state ={
    incidencias: [
              {
        id_incidencias: 1,
        id_usuario: "xurdeds",
        titulo: "Proyecto averia",
        descripcion: "Proyecto averiado en el aula 2",
        categoria: "Hardware",
        nivel_urgencia: "Media",
        fecha_registro: "2025-10-20",
        estado: "Abierto",
        ubicacion: "B205"

    },
    {
        id_incidencias: 2,
        id_usuario: "xurdeds",
        titulo: "Proyecto averia",

        descripcion: "Ordenador no enciende",
        categoria: "Hardware",
        nivel_urgencia: "Baja",
        fecha_registro: "2025-10-20",
        estado: "Abierto",
        ubicacion: "B205"

    },
    /*{
        id_incidencias: 3,
        id_usuario: "xurdeds",
        titulo: "Proyecto averia",

        descripcion: "Impresora sin conexion",
        categoria: "Hardware",
        nivel_urgencia: "Media",
        fecha_registro: "2025-10-20",
        estado: "Abierto",
        ubicacion: "B205"

    },
    {
        id_incidencias: 4,
        id_usuario: "xurdeds",
        titulo: "Proyecto averia",
        
        descripcion: "WIFI no disponible",
        categoria: "Hardware",
        nivel_urgencia: "Alta",
        fecha_registro: "2025-10-20",
        estado: "Abierto",
        ubicacion: "B205"
    },*/
    ]
      
    }
    agregarIncidencia=(id_nuevo, titulo_nuevo, usuario_nuevo, descripcion_nuevo, categoria_nuevo,nivel_urgencia_nuevo, ubicacion_nuevo, fecha_registro_nuevo, estado_nuevo,)=>{
      const nueva_incidencia={
        id_incidencias: id_nuevo,
        id_usuario: usuario_nuevo,
        titulo: titulo_nuevo,
        descripcion: descripcion_nuevo,
        categoria: categoria_nuevo,
        nivel_urgencia: nivel_urgencia_nuevo,
        fecha_registro: fecha_registro_nuevo,
        estado: estado_nuevo,
        ubicacion: ubicacion_nuevo
      }
      console.log("Nueva incidencia",nueva_incidencia);
      this.setState({incidencias:[...this.state.incidencias, nueva_incidencia]})
    }
  render(){
  return (
    <>
    <Header/>
    <h2>Mi aplicacion </h2>
     <p>Este es mi contenido de la app</p>
    <div className="Contenedor-incidencias">
      <main>
          <MiLista incidencias={this.state.incidencias}/>
          </main>
        <aside>
       <Form agregarIncidencia={this.agregarIncidencia}/>
        </aside>
    </div>
    <Footer/>
    </>

  );
}
}
export default App;
