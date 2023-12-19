const db = require('../../config/db/database.sqlite');

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
  const connection = await db.pool();
  const item = await connection.run(
    'UPDATE users SET first_name = ?, second_name = ? WHERE id = ?',
    firstName,
    secondName,
    id
  );
  console.log(item);
  return item;
};

const create = async ({ firstName, secondName, email, country }) => {
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
};

module.exports = {
  find,
  update,
  create,
};
