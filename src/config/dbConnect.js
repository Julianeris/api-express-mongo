const mongoose = require ("mongoose");

async function conectaNaDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}

module.exports = conectaNaDatabase;