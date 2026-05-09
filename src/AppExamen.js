import { useState, createContext } from "react";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";    
import Tareas from "./Tareas";           

export const authContext = createContext();

function AppExamen() {
    const [tareas, setTareas] = useState([
        "Estudiar React",
        "Hacer ejercicio",
        "Avanzar proyecto",

    ]);
    const [usuarioLogin, setUsuarioLogin] = useState({
        nombre: "Pepe",
        correo: "Pepe@gmail.com",
    });
  return (
    <div className="App">
      <h1>Examen React</h1>
      <Routes>
        <Route path="/" element={<h2>Pantalla de Inicio</h2>} />
        <Route path="/tareas" element={<Tareas tareas={tareas} />} />
      </Routes>
      <authContext.Provider value={{usuarioLogin}}>
        <Menu />
      </authContext.Provider>
    </div>
  );
} export default AppExamen;