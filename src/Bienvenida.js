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
<div style={{ padding: '30px' }}>
<h2>Bienvenido/a, {usuario}</h2>
<button onClick={() => navigate('/usuarios')} style={{ marginRight: '10px' }}>Ver Usuarios</button>
<button onClick={() => navigate('/roles')} style={{ marginRight: '10px' }}>Ver Roles</button>
<button onClick={cerrarSesion}>Cerrar sesión</button>
</div>
  );
}
 
export default Bienvenida;