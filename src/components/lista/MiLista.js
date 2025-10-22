import React, { useState } from "react";

function MiLista() {
    const [incidencias, setIncidencias] = useState([
        {
            id_incidencia: 1,
            id_usuario: "12345",
            titulo:  "Proyecto averiado en el aula 2",
            descripcion: "Proyecto averiado en el aula 2", 
            categoria: "Hardware",
            nivel_urgencia: "Media",
            fecha_registro: "2025-10-20",
            estado: "Abierta",
            ubicacion: "B205"

        },
        {
            id_incidencia: 2,
            id_usuario: "12345",
            titulo:  "Ordenadores no encienden",
            descripcion: "Ordenadores no encienden", 
            categoria: "Hardware",
            nivel_urgencia: "Alta",
            fecha_registro: "2025-10-20",
            estado: "Abierta",
            ubicacion: "B205"

        },
        {
            id_incidencia: 3,
            id_usuario: "12345",
            titulo:  "Error 404",
            descripcion: "Error 404", 
            categoria: "Hardware",
            nivel_urgencia: "Alta",
            fecha_registro: "2025-10-20",
            estado: "Abierta",
            ubicacion: "B205"

        },
        {
            id_incidencia: 4,
            id_usuario: "12345",
            titulo:  "Fallo técnico",
            descripcion: "Fallo técnico", 
            categoria: "Hardware",
            nivel_urgencia: "Alta",
            fecha_registro: "2025-10-20",
            estado: "Abierta",
            ubicacion: "B205"
        },
    
        ]);
    

    return(
        <div className='lista'>
            <ul>
               {
                incidencias.map((i)=>(
                    <li>              
                            <strong>id incidencia:</strong> {i.id_incidencia}<br></br>
                            <strong>titulo:</strong> {i.titulo}<br></br>
                            <strong>descripcion:</strong> {i.descripcion}<br></br>
                            <strong>usuario:</strong> {i.id_usuario}<br></br>
                            <strong>ubicacion:</strong> {i.ubicacion}<br></br><br></br>
                    </li>
                ))
               }
            </ul>
            
        </div>
    )
}

export default MiLista