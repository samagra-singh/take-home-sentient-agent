export const getClient = jest.fn(async () => ({
  connect: jest.fn(),
  flushAll: jest.fn(),
  keys: jest.fn(),
  json: {
    set: jest.fn(),
    get: jest.fn(),
  },
}));
