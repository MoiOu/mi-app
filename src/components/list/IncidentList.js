import React from "react";

const IncidentList = ({ incidencias, user, onCerrar }) => {
  if (!incidencias || incidencias.length === 0) {
    return <p className="text-white">No hay incidencias registradas.</p>;
  }

  return (
    <div className="table-responsive bg-white p-3 rounded shadow-sm">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Usuario</th>
            <th>Urgencia</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            {user?.rol?.nombre_rol === "admin" && <th>Acciones</th>}
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
              {user?.rol?.nombre_rol === "admin" && (
                <td>
                  {inc.estado !== "Cerrada" ? (
                    <button className="btn btn-danger btn-sm" onClick={() => onCerrar(inc.id)}>Cerrar</button>
                  ) : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;