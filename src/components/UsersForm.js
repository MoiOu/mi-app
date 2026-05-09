import React, { useState } from 'react';

function UsersForm({ onUsuarioCreado }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enviarForm = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      nombre,
      email,
      password,
      rol: { id: 2, nombre_rol: "usuario" }
    };
    onUsuarioCreado(nuevoUsuario);
    setNombre(''); setEmail(''); setPassword('');
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4>Nuevo Usuario</h4>
      <form onSubmit={enviarForm}>
        <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-success w-100" type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default UsersForm;