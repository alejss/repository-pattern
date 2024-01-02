const request = require('supertest');
const app = require('../../../../src/app');
const userRepository = require('../../../../src/repositories/user');

jest.mock('../../../../src/repositories/user');

describe('User routes', () => {
  test('When endpoint /users/all response success', async () => {
    const data = [
      {
        id: 1,
        first_name: 'Alejandro 2',
        second_name: 'Sanchez 2',
        country: 'Guatemala',
        email: 'ale@gmail.com',
      },
      {
        id: 2,
        first_name: 'Alejandro 2',
        second_name: 'Sanchez 2',
        country: 'Guatemala',
        email: 'testemail@gmail.com',
      },
    ];

    userRepository.all.mockResolvedValue(data);

    const response = await request(app).get('/users/all').send({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual(data);
  });

  test('When endpoint /users/all response error', async () => {
    userRepository.all.mockRejectedValue(new Error('Database connection error'));

    const response = await request(app).get('/users/all').send({});

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Error in service');
  });
});
