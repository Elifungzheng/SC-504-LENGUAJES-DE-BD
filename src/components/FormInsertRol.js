//src/components/FormInsetRol.js

import React, { useState } from 'react';
import axios from 'axios';

function FormInsertRol({ onRolCreado }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

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
    <form onSubmit={manejarSubmit}>
      <h3>Insertar nuevo rol</h3>
      <input
        type="text"
        placeholder="Nombre del rol"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar Rol</button>
    </form>
  );
}

export default FormInsertRol;
