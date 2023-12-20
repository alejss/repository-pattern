const db = require('../../config/db/database.sqlite');

const all = async () => {
  try {
    const connection = await db.pool();
    const item = await connection.all('SELECT * FROM users');
    return item;
  } catch (error) {
    return error;
  }
};

const find = async (id) => {
  try {
    const connection = await db.pool();
    const item = await connection.get('SELECT * FROM users WHERE id = ?', id);
    return item;
  } catch (error) {
    return error;
  }
};

const update = async ({ id, firstName, secondName }) => {
  try {
    const connection = await db.pool();
    const item = await connection.run(
      'UPDATE users SET first_name = ?, second_name = ? WHERE id = ?',
      firstName,
      secondName,
      id
    );
    return item;
  } catch (error) {
    return error;
  }
};

const create = async ({ firstName, secondName, email, country }) => {
  try {
    const connection = await db.pool();
    const item = await connection.run(
      'INSERT INTO users(first_name, second_name, email, country) VALUES (:first_name, :second_name, :email, :country)',
      {
        ':first_name': firstName,
        ':second_name': secondName,
        ':email': email,
        ':country': country,
      }
    );
    
    return item;
  } catch (error) {
    return error
  }
};

module.exports = {
  all,
  find,
  update,
  create,
};
