import { FastifyInstance } from 'fastify';

class TestError extends Error {
  override name = 'TestError';
}

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: { error: unknown }}>('/', async function (request) {
    if (request.query.error) {
      throw new TestError('This is a test error to debug appsignal reporting')
    }
    return { message: 'Hello API' };
  });
}
