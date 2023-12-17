const db = require('../../config/db/database.sqlite');

const find = async (id) => {
  try {
    const connection = await db.pool()
    const item = await connection.get('SELECT * FROM users WHERE id = ?', id)
    return item;
  } catch (error) {
    return error;
  }
};

module.exports = {
  find,
};
