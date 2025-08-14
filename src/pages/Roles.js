//src/pages/roles.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormInsertRol from '../components/FormInsertRol';

  const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [descripcionEditada, setDescripcionEditada] = useState('');

  const cargarRoles = async () => {
    setCargando(true);
    axios.get('http://localhost:3001/api/roles')
      .then(response => {
        setRoles(response.data);
        setCargando(false);
      })
      .catch(error => {
        setError('Error al obtener roles');
        setCargando(false);
        console.error(error);
      });
  };

  useEffect(() => {
    cargarRoles();
  }, []);




  const iniciarEdicion = (rol_id, nombre, descripcion) => {
  setEditandoId(rol_id);  
  setNombreEditado(nombre);
  setDescripcionEditada(descripcion);
};

const cancelarEdicion = () => {
  setEditandoId(null);
  setNombreEditado('');
  setDescripcionEditada('');
};

const guardarCambios = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEditado, descripcion: descripcionEditada }),
    });

    if (response.ok) {
      alert('Rol actualizado correctamente');
      cancelarEdicion();
      cargarRoles(); // recarga la lista con el rol actualizado
    } else {
      alert('Error al actualizar el rol');
    }
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    alert('Ocurrió un error al actualizar el rol');
  }
};




  // Función para eliminar rol
  const eliminarRol = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/roles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Rol eliminado');
        setRoles(roles.filter(r => r.ROL_ID !== id));
      } else {
        alert('Error al eliminar el rol');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al intentar eliminar el rol');
    }
  };

  if (cargando) return <div>Cargando Roles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Gestión de Roles</h1>

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
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Descripción</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(rol => (
            <tr key={rol.ROL_ID} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{rol.ROL_ID}</td>

              {editandoId === rol.ROL_ID ? (
                <>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="text"
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                      style={{ padding: '6px', width: '90%' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <input
                      type="text"
                      value={descripcionEditada}
                      onChange={(e) => setDescripcionEditada(e.target.value)}
                      style={{ padding: '6px', width: '90%' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => guardarCambios(rol.ROL_ID)}
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
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: '10px' }}>{rol.NOMBRE}</td>
                  <td style={{ padding: '10px' }}>{rol.DESCRIPCION}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => iniciarEdicion(rol.NOMBRE, rol.DESCRIPCION)}
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
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarRol(rol.ROL_ID)}
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
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Agregar nuevo rol</h2>
      <FormInsertRol onRolCreado={cargarRoles} />
    </div>
  );
};

export default Roles;


            /*<td>{rol.NOMBRE}</td>
            <td>{rol.DESCRIPCION}</td>
            <td>
              {descripcionEditada === rol.DESCRIPCION ? (
                <input
                  type="descripcion"
                  value={descripcionEditada}
                  onChange={(e) => setDescripcionEditada(e.target.value)}
                />
              ) : (
                rol.DESCRIPCION
              )}
            </td>
            <td>{rol.DESCRIPCION}</td>
            <td>
              {descripcionEditada === rol.DESCRIPCION ? (
                <>
                    <button onClick={() => guardarDescripcion(rol.DESCRIPCION)}>Guardar</button>
                    <button onClick={() => cancelarEdicion}>Cancelar</button>
                  </>
                ) : (
                  <>
          
                    <button onClick={() => iniciarEdicion(rol.NOMBRE, rol.DESCRIPCION)}>Editar</button>
                    <button onClick={() => eliminarRol(rol.ROL_ID)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    <h2>Editar de Roles</h2>

    <FormInsertRol onRolCreado={cargarRoles} />

    </div>
  );
}

export default Roles;*/

