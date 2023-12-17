const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const pool = async () => {
  try {
    const connection = await open({
      filename: './data/database.db',
      driver: sqlite3.Database,
    });
    return connection
  } catch (error) {
    return error
  }
};

const config = async () => {
  try {
    return
  } catch (error) {
    return error;
  }
};

module.exports = {
  pool,
  config,
};
