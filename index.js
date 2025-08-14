// index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
 
const pacienteRoutes = require('./routes/pacientes');
app.use('/api/pacientes', pacienteRoutes);
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);
 
const usuariosRouter = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRouter);

const rolesRouter = require('./routes/roles');
app.use('/api/roles', rolesRouter);
