// src/pages/usuarios.js

import React, { useEffect, useState } from 'react';
import FormInsertUsuario from '../components/FormInsertUsuario';
import axios from 'axios';

/*const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (cargando) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;*/

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
    <h2>Lista de Usuarios</h2>

    <FormInsertUsuario onUsuarioCreado={cargarUsuarios} />

    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de Usuario</th>
          <th>Email</th>
          <th>ID Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario.USUARIO_ID}>
            <td>{usuario.USUARIO_ID}</td>
            <td>{usuario.NOMBRE_USUARIO}</td>
            <td>
              {editandoUsuarioId === usuario.USUARIO_ID ? (
                <input
                  type="email"
                  value={correoEditado}
                  onChange={(e) => setCorreoEditado(e.target.value)}
                />
              ) : (
                usuario.CORREO
              )}
            </td>
            <td>{usuario.ROL_ID}</td>
            <td>
              {editandoUsuarioId === usuario.USUARIO_ID ? (
                <>
                  <button onClick={() => guardarCorreo(usuario.USUARIO_ID)}>Guardar</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                </>
              ) : (
                <>
                  <button onClick={() => iniciarEdicion(usuario.USUARIO_ID, usuario.CORREO)}>Editar correo</button>
                  <button onClick={() => eliminarUsuario(usuario.USUARIO_ID)}>Eliminar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);};




export default Usuarios;


