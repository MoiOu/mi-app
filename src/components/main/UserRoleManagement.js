import React from 'react';
import UsersForm from '../UsersForm'; // Ajusta la ruta si es necesario

function UserRoleManagement({ usuarios, onCambiarRol, onCrearUsuario }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="mb-4">Gestión de Usuarios y Roles</h2>
      
      <UsersForm onUsuarioCreado={onCrearUsuario} />

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol Actual</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td><span className="badge bg-info text-dark">{u.rol?.nombre_rol}</span></td>
              <td>
                <button 
                  className="btn btn-warning btn-sm"
                  onClick={() => onCambiarRol(u)}
                >
                  Cambiar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserRoleManagement;