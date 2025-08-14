// src/pages/usuarios.js

import React, { useEffect, useState } from 'react';
import FormInsertUsuario from '../components/FormInsertUsuario';
import axios from 'axios';



  const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [correoEditado, setCorreoEditado] = useState('');
  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);

  const cargarUsuarios = () => {
    setCargando(true);
    axios.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
        setCargando(false);
      })
      .catch(error => {
        setError('Error al obtener usuarios');
        setCargando(false);
        console.error(error);
      });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);


  //Actualizar correo usuario
  const iniciarEdicion = (id, correoActual) => {
  setEditandoUsuarioId(id);
  setCorreoEditado(correoActual);
};

const cancelarEdicion = () => {
  setEditandoUsuarioId(null);
  setCorreoEditado('');
};

const guardarCorreo = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: correoEditado }),
    });

    if (response.ok) {
      alert('Correo actualizado correctamente');
      cancelarEdicion();
      cargarUsuarios(); // recarga la lista con el correo actualizado
    } else {
      alert('Error al actualizar el correo');
    }
  } catch (error) {
    console.error('Error al actualizar correo:', error);
    alert('Ocurrió un error al actualizar el correo');
  }
};




  // Función para eliminar usuario
  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Desea eliminar este usuario?')) return;
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuario eliminado');
        setUsuarios(usuarios.filter(u => u.USUARIO_ID !== id));
      } else {
        alert('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al intentar eliminar el usuario');
    }
  };

  if (cargando) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;


  return (
  <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
  <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Usuarios</h1>

  <table
    style={{
      borderCollapse: 'collapse',
      width: '100%',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
      <tr>
        <th style={{ padding: '10px' }}>ID</th>
        <th style={{ padding: '10px' }}>Nombre de Usuario</th>
        <th style={{ padding: '10px' }}>Email</th>
        <th style={{ padding: '10px' }}>ID Rol</th>
        <th style={{ padding: '10px' }}>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {usuarios.map(usuario => (
        <tr key={usuario.USUARIO_ID} style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px' }}>{usuario.USUARIO_ID}</td>
          <td style={{ padding: '10px' }}>{usuario.NOMBRE_USUARIO}</td>
          <td style={{ padding: '10px' }}>
            {editandoUsuarioId === usuario.USUARIO_ID ? (
              <input
                type="email"
                value={correoEditado}
                onChange={(e) => setCorreoEditado(e.target.value)}
                style={{ padding: '6px', width: '90%' }}
              />
            ) : (
              usuario.CORREO
            )}
          </td>
          <td style={{ padding: '10px' }}>{usuario.ROL_ID}</td>
          <td style={{ padding: '10px' }}>
            {editandoUsuarioId === usuario.USUARIO_ID ? (
              <>
                <button
                  onClick={() => guardarCorreo(usuario.USUARIO_ID)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Guardar
                </button>
                <button
                  onClick={cancelarEdicion}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => iniciarEdicion(usuario.USUARIO_ID, usuario.CORREO)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Editar correo
                </button>
                <button
                  onClick={() => eliminarUsuario(usuario.USUARIO_ID)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Agregar nuevo usuario</h2>
  <FormInsertUsuario onUsuarioCreado={cargarUsuarios} />
</div>

);};



export default Usuarios;


