const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const pool = async () => {
  try {
    const connection = await sqlite.open({
      filename: './data/database.db',
      driver: sqlite3.Database,
    });

    return connection;
  } catch (error) {
    return error;
  }
};

module.exports = {
  pool,
};
