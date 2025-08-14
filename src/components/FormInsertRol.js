//src/components/FormInsetRol.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormInsertRol({ onRolCreado }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/roles', { nombre, descripcion });
      setNombre('');
      setDescripcion('');
      onRolCreado();
    } catch (error) {
      console.error('Error insertando rol:', error);
    }
  };

  return (
 <form onSubmit={manejarSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
  <h3>Insertar nuevo rol</h3>
  <input
    type="text"
    placeholder="Nombre del rol"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    required
    style={{ padding: '6px' }}
  />
  <input
    type="text"
    placeholder="Descripción"
    value={descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
    style={{ padding: '6px' }}
  />
  <button type="submit" style={{ padding: '6px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    Agregar Rol
  </button>
  <button type="button" onClick={() => navigate(-1)} style={{ padding: '6px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    Volver</button>
</form>

  );
}

export default FormInsertRol;
