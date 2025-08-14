// Bienvenida.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
 
function Bienvenida() {
  const usuario = localStorage.getItem('usuario');
  const navigate = useNavigate();
 
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };
 
  return (
<div
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '50px auto',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginBottom: '30px' }}>Bienvenido/a, {usuario}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button
          onClick={() => navigate('/usuarios')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Ver Usuarios
        </button>

        <button
          onClick={() => navigate('/roles')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Ver Roles
        </button>

        <button
          onClick={cerrarSesion}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
 
export default Bienvenida;