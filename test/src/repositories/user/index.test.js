jest.mock('../../../../src/config/db/database.sqlite');

const db = require('../../../../src/config/db/database.sqlite');
const {
  all,
  find,
  create,
  update,
} = require('../../../../src/repositories/user/index');

describe('Repository User Test', () => {
  test('When all method response a success', async () => {
    const mockConnection = {
      all: jest.fn().mockResolvedValue([
        {
          id: 1,
          first_name: 'Alejandro',
          second_name: 'Sanchez',
          country: 'Guatemala',
          email: 'ale@gmail.com',
        },
      ]),
    };
    db.pool.mockResolvedValue(mockConnection);

    const result = await all();

    expect(result.length).toEqual(1);
  });

  test('When find method response a error', async () => {
    db.pool.mockRejectedValue(new Error('Database connection error'));

    const result = await all();

    expect(result.message).toEqual('Database connection error');
  });

  test('When find method response a success', async () => {
    const mockConnection = {
      get: jest.fn().mockResolvedValue({
        id: 1,
        first_name: 'Alejandro',
        second_name: 'Sanchez',
        country: 'Guatemala',
        email: 'ale@gmail.com',
      }),
    };
    db.pool.mockResolvedValue(mockConnection);

    const result = await find(1);

    expect(result).toEqual({
      id: 1,
      first_name: 'Alejandro',
      second_name: 'Sanchez',
      country: 'Guatemala',
      email: 'ale@gmail.com',
    });
  });

  test('When find method response a error', async () => {
    db.pool.mockRejectedValue(new Error('Database connection error'));

    const result = await find(1);

    expect(result.message).toEqual('Database connection error');
  });

  test('When update user is success', async () => {
    const mockConnection = {
      run: jest.fn().mockResolvedValue({ stmt: {}, lastID: 0, changes: 1 }),
    };

    db.pool.mockResolvedValue(mockConnection);

    const result = await update({
      id: 5,
      firstName: 'Alejandro 2',
      secondName: 'Sanchez 2',
      email: 'testemail@gmail.com',
      country: 'Guatemala',
    });

    expect(result).toEqual({ stmt: {}, lastID: 0, changes: 1 });
  });

  test('When update user response a error', async () => {
    db.pool.mockRejectedValue(new Error('DB Error'));

    const result = await update({
      firstName: 'Alejandro 2',
      secondName: 'Sanchez 2',
      email: 'testemail@gmail.com',
      country: 'Guatemala',
    });

    expect(result.message).toEqual('DB Error');
  });

  test('When create user is success', async () => {
    const mockConnection = {
      run: jest.fn().mockResolvedValue({
        stmt: {},
        lastID: 1,
        changes: 1,
      }),
    };

    db.pool.mockResolvedValue(mockConnection);

    const result = await create({
      firstName: 'Alejandro 2',
      secondName: 'Sanchez 2',
      email: 'testemail@gmail.com',
      country: 'Guatemala',
    });

    expect(result).toEqual({
      stmt: {},
      lastID: 1,
      changes: 1,
    });
  });

  test('When create user response a error', async () => {
    db.pool.mockRejectedValue(new Error('DB Error'));

    const result = await create({
      firstName: 'Alejandro 2',
      secondName: 'Sanchez 2',
      email: 'testemail@gmail.com',
      country: 'Guatemala',
    });

    expect(result.message).toEqual('DB Error');
  });
});
