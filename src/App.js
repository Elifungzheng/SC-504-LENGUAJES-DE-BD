// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Bienvenida from './Bienvenida';
import Usuarios from './pages/Usuarios';
import Roles from './pages/Roles';
 
function App() {
  return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/bienvenida" element={<Bienvenida />} />
<Route path="/usuarios" element={<Usuarios />} />
<Route path="/roles" element={<Roles />} />
</Routes>
</BrowserRouter>
  );
}
 
export default App;