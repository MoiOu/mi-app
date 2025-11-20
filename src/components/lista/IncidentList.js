import React, { useState } from "react";

function MiLista(props){

   return(
    <div className="container mt-3">
        <div>
            {props.incidencias.map((i) => (
                <div key={i.id_incidencia} className="mb-4 pb-2 border-bottom text-black "style={{ backgroundColor: "#dfddddff", color: "white" }}>
                    <dt className="text-titulopersonalizado-azul">
                        <strong>Título: {i.titulo}</strong><br/>
                    </dt>
                    <dd className="text-muted"><strong>Descripción: </strong>{i.descripcion}</dd>
                    <dd><strong>Usuario: </strong>{i.id_usuario}</dd>
                    <dd><strong>Urgencia: </strong>{i.nivel_urgencia}</dd>
                    <dd><strong>Ubicación: </strong>{i.ubicacion}</dd><br/><br/>
                </div>
            ))}
        </div>
    </div>
);

}

export default MiLista;
