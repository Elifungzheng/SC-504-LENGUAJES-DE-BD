// src/components/FormInsertarUsuario.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormInsertUsuario = ({ onUsuarioCreado }) => {
  // Estado local para cada campo del formulario
  const [usuario_id, setUsuarioId] = useState('');
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol_id, setRolId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/usuarios', {
        usuario_id,
        nombre_usuario,
        password_hash,
        correo,
        rol_id
      });

      alert('Usuario creado correctamente');
      // Limpiar formulario
      setUsuarioId('');
      setNombreUsuario('');
      setPasswordHash('');
      setCorreo('');
      setRolId('');

      // Llamar función para recargar lista en el componente padre
      onUsuarioCreado();

    } catch (error) {
      console.error('Error creando usuario:', error);
      alert('Error al crear usuario');
    }
  };

  return (
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <h3>Crear nuevo usuario</h3>
      <input
        type="number"
        placeholder="ID Usuario"
        value={usuario_id}
        onChange={(e) => setUsuarioId(e.target.value)}
        required
        style={{ padding: '6px' }}
      />
      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={nombre_usuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        required
        style={{ padding: '6px' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password_hash}
        onChange={(e) => setPasswordHash(e.target.value)}
        required
        style={{ padding: '6px' }}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
        style={{ padding: '6px' }}
      />
      <input
        type="number"
        placeholder="ID Rol"
        value={rol_id}
        onChange={(e) => setRolId(e.target.value)}
        required
        style={{ padding: '6px' }}
      />
        <button type="submit" style={{ padding: '6px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Crear Usuario</button>
        <button type="button" onClick={() => navigate(-1)} style={{ padding: '6px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Volver</button>
    </form>
  );
}

export default FormInsertUsuario;
