// routes/pacientes.js

const express = require('express');

const router = express.Router();

const getConnection = require('../db/oracleConnection');

const oracledb = require('oracledb');
 
// Obtener todos los pacientes

router.get('/', async (req, res) => {

  try {

    const conn = await getConnection();

    const result = await conn.execute(

      `SELECT * FROM paciente`,

      [],

      { outFormat: oracledb.OUT_FORMAT_OBJECT }

    );

    res.json(result.rows);

    await conn.close();

  } catch (err) {

    console.error('Error GET pacientes:', err);

    res.status(500).send(err.message);

  }

});
 
//  Crear un nuevo paciente

router.post('/', async (req, res) => {

  const {

    nombre,

    primer_apellido,

    segundo_apellido,

    tipo_documento,

    numero_documento,

    fecha_nacimiento,

    sexo,

    telefono,

    correo,

    direccion

  } = req.body;
 
  try {

    const conn = await getConnection();

    const sql = `

      INSERT INTO paciente (

        nombre, primer_apellido, segundo_apellido,

        tipo_documento, numero_documento,

        fecha_nacimiento, sexo, telefono, correo, direccion

      ) VALUES (

        :nombre, :primer_apellido, :segundo_apellido,

        :tipo_documento, :numero_documento,

        TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'), :sexo, :telefono, :correo, :direccion

      )

    `;

    await conn.execute(sql, {

      nombre,

      primer_apellido,

      segundo_apellido,

      tipo_documento,

      numero_documento,

      fecha_nacimiento,

      sexo,

      telefono,

      correo,

      direccion

    }, { autoCommit: true });
 
    res.status(201).send('Paciente creado correctamente.');

    await conn.close();

  } catch (err) {

    console.error('Error POST paciente:', err);

    res.status(500).send(err.message);

  }

});
 
module.exports = router;

 