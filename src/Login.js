// Login.js

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './Login.css';
 
function Login() {

  const [nombreUsuario, setNombreUsuario] = useState('');

  const [password, setPassword] = useState('');

  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {

    e.preventDefault();
 
    try {

      const response = await fetch('http://localhost:3001/api/login', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ nombre_usuario: nombreUsuario, password })

      });
 
      const data = await response.text();
 
      if (response.ok) {

        // Guardar sesión

        localStorage.setItem('usuario', nombreUsuario);

        // Redirigir a pantalla bienvenida

        navigate('/bienvenida');

      } else {

        setMensaje('❌ Credenciales inválidas');

      }

    } catch (error) {

      console.error(error);

      setMensaje('⚠️ Error al conectar con el servidor');

    }

  };
 
  return (
<div className="login-container">
<h2>Centro Terapeutico Bonzai</h2>
<form onSubmit={handleSubmit} className="login-form">
<label>Usuario:</label>
<input

          type="text"

          value={nombreUsuario}

          onChange={(e) => setNombreUsuario(e.target.value)}

          required

        />
 
        <label>Contraseña:</label>
<input

          type="password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

          required

        />
 
        <button type="submit">Ingresar</button>
</form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
</div>

  );

}
 
export default Login;

 