jest.mock('sqlite');

const db = require('../../../../src/config/db/database.sqlite');

const MockSQLiteModule = () => {
  const mockOpen = jest.fn();
  return {
    mockOpen,
    configure: () => {
      require('sqlite').open.mockImplementationOnce(mockOpen);
    },
  };
};

const { mockOpen, configure } = MockSQLiteModule();

describe('Mock DB SQLite Connection', () => {
  test('When connection is success', async () => {
    configure();
    mockOpen.mockResolvedValue('Connected');
    const connection = await db.pool();

    expect(connection).toEqual('Connected');
  });

  test('When connection error return error', async () => {
    configure();
    mockOpen.mockRejectedValue(new Error('Timeout connection DB'));

    const connection = await db.pool();

    expect(connection.message).toEqual('Timeout connection DB');
  });
});
