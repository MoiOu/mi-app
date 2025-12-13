import React from "react";

const IncidentList = ({ incidencias }) => {
  if (!incidencias || incidencias.length === 0) {
    return <p>No hay incidencias registradas.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Usuario</th>
            <th>Urgencia</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>

        <tbody>
          {incidencias.map((inc) => (
            <tr key={inc.id}>
              <td>{inc.id}</td>
              <td>{inc.titulo}</td>
              <td>{inc.usuario?.email ?? inc.usuario?.nombre ?? inc.usuario}</td>
              <td>{inc.nivel_urgencia}</td>
              <td>{inc.ubicacion}</td>
              <td>{inc.estado}</td>
              <td>{inc.fecha_registro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
