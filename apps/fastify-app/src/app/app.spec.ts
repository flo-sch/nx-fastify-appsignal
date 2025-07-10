import Fastify, { FastifyInstance } from 'fastify';
import { app } from './app';

describe('GET /', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should respond with a message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({ message: 'Hello API' });
  });

  it('should respond with an error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/?error=true',
    });

    expect(response.statusCode).toEqual(500);
    expect(response.json()).toMatchObject({
      error: expect.any(String),
      message: expect.stringContaining('test error'),
    });
  });
});
