// routes/usuarios.js

const express = require('express');
const router = express.Router();
const getConnection = require('../db/oracleConnection');
const oracledb = require('oracledb');




// Obtener todos los usuarios

router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // obtener conexión
    const result = await connection.execute(
  'SELECT * FROM USUARIO',
  [],
  { outFormat: oracledb.OUT_FORMAT_OBJECT }
);
  res.json(result.rows);

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
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





/// Insertar nuevo usuario
router.post('/', async (req, res) => {
  const { usuario_id, nombre_usuario, password_hash, correo, rol_id } = req.body;

  let connection;
  try {
    connection = await getConnection();

    await connection.execute(
      `BEGIN pkg_usuario.insertar_usuario(:id, :nombre, :pass, :correo, :rol); END;`,
      {
        id: usuario_id,
        nombre: nombre_usuario,
        pass: password_hash,
        correo,
        rol: rol_id
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'No se pudo crear el usuario' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando conexión:', err);
      }
    }
  }
});



// Actualizar correo del usuario
router.put('/:id', async (req, res) => {
  const usuario_id = req.params.id;
  const { correo } = req.body;

  let connection;
  try {
    connection = await getConnection();

    await connection.execute(
      `BEGIN pkg_usuario.actualizar_correo(:id, :correo); END;`,
      { id: usuario_id, correo },
      { autoCommit: true }
    );

    res.json({ message: 'Correo actualizado correctamente' });

  } catch (err) {
    console.error('Error al actualizar correo:', err);
    res.status(500).json({ error: 'No se pudo actualizar el correo' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando conexión:', err);
      }
    }
  }
});


// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const usuario_id = req.params.id;
  let connection;  // Declarar aquí para que sea accesible en todo el bloque

  try {
    connection = await getConnection();  // Asignar aquí

    console.log("Intentando eliminar usuario con ID:", usuario_id);

    const result = await connection.execute(
        `BEGIN pkg_usuario.eliminar_usuario(:id_usuario); END;`,
        { id_usuario: usuario_id },
        { autoCommit: true }
    );

    console.log("Resultado de la eliminación:", result);

    res.status(200).json({ message: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});



module.exports = router;
