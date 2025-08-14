// db/oracleConnection.js

const oracledb = require('oracledb');
 
const dbConfig = {

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  connectString: process.env.DB_CONNECT

};
 
async function getConnection() {

  try {

    const connection = await oracledb.getConnection(dbConfig);

    return connection;

  } catch (err) {

    console.error('Error al conectar con Oracle:', err);

    throw err;

  }

}
 
module.exports = getConnection;

 