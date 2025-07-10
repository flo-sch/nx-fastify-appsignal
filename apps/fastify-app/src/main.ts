import { Appsignal, sendError } from '@appsignal/nodejs';
import Fastify from 'fastify';
import { app } from './app/app';
import { logger } from './app/logger';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
  loggerInstance: logger,
});

// Register your application as a normal plugin.
server.register(app);

// Register custom error handler
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);

  // Report error to Appsignal
  sendError(error);

  // Send a generic error response
  reply.status(500).send({
    error: 'Internal Server Error',
  });
});

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }

  if (Appsignal.client?.isActive) {
    server.log.info(
      'AppSignal monitoring initialized for application: %s, with environment: %s',
      Appsignal.client.config.data.name,
      Appsignal.client.config.data.environment
    );
  } else {
    server.log.warn('Appsignal client is not active, monitoring is disabled. Have you configured a valid APPSIGNAL_PUSH_API_KEY parameter?')
  }
});
