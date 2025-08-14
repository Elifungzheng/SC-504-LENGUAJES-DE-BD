// routes/login.js

const express = require('express');

const router = express.Router();

const getConnection = require('../db/oracleConnection');

const oracledb = require('oracledb');
 
router.post('/', async (req, res) => {

  const { nombre_usuario, password } = req.body;
 
  if (!nombre_usuario || !password) {

    return res.status(400).send('Faltan datos');

  }
 
  try {

    const conn = await getConnection();
 
    const result = await conn.execute(

      `SELECT password_hash FROM usuario WHERE nombre_usuario = :nombre`,

      [nombre_usuario],

      { outFormat: oracledb.OUT_FORMAT_OBJECT }

    );
 
    await conn.close();
 
    if (result.rows.length === 0) {

      return res.status(401).send('Usuario no encontrado');

    }
 
    const hashEnBD = result.rows[0].PASSWORD_HASH;
 
    //  Comparación simple (solo para pruebas). En producción usar bcrypt.

    if (password === hashEnBD) {

      return res.status(200).send('Acceso concedido');

    } else {

      return res.status(401).send('Contraseña incorrecta');

    }

  } catch (error) {

    console.error('Error en login:', error);

    res.status(500).send('Error del servidor');

  }

});
 
module.exports = router;

 