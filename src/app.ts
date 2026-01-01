import path from 'node:path';
import autoload from '@fastify/autoload';
import Fastify from 'fastify';

import envPlugin from './plugins/env';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(envPlugin);

  app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /env\.(ts|js)$/,
  });

  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  return app;
}
