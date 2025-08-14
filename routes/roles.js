// routes/roles.js

const express = require('express');
const router = express.Router();
const getConnection = require('../db/oracleConnection');
const oracledb = require('oracledb');




// Obtener todos los roles 
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // obtener conexión
    const result = await connection.execute(
  'SELECT * FROM ROL',
  [],
  { outFormat: oracledb.OUT_FORMAT_OBJECT }
);
  res.json(result.rows);

  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  } finally {
    if (connection) {
      try {
        await connection.close(); // cerrar conexión
      } catch (err) {
        console.error('Error cerrando conexión:', err);
      }
    }
  }
});


// Obtener un rol por ID
router.get('/:id', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `BEGIN :cursor := pkg_rol.obtener_rol(:id); END;`,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
        id: req.params.id
      }
    );

    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows();
    await resultSet.close();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el rol' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// Insertar rol
router.post('/', async (req, res) => {
  const { rol_id, nombre, descripcion } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `BEGIN pkg_rol.insertar_rol(:id, :nombre, :descripcion); END;`,
      { id: rol_id, nombre: nombre, descripcion: descripcion },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Rol insertado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// Actualizar rol
router.put('/:id', async (req, res) => {
  const rol_id = req.params.id;
  const { nombre, descripcion } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `BEGIN pkg_rol.actualizar_rol(:id, :nombre, :descripcion); END;`,
      { id: rol_id, nombre, descripcion },
      { autoCommit: true }
    );

    res.json({ message: 'Rol actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// Eliminar rol
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  let connection;
  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `BEGIN pkg_rol.eliminar_rol(:id_rol); END;`,
      { id_rol: rol_id },
      { autoCommit: true }
    );

    res.json({ message: 'Rol eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

module.exports = router;
