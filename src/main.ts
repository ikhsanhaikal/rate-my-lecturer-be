/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'node:fs';
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const httpsOptions = {
  key: readFileSync(
    '/Users/admin/Projects/rate-my-lecturer-graphql-user/be/server.key',
  ),
  cert: readFileSync(
    '/Users/admin/Projects/rate-my-lecturer-graphql-user/be/server.cert',
  ),
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: ['https://127.0.0.1:3000', 'https://127.0.0.1:3000/'],
    credentials: true,
  });
  app.use(
    session({
      secret: 'beryberysecret',
      resave: false,
      saveUninitialized: false,
      store: new MemoryStore({
        checkPeriod: 30 * 60 * 1000,
        ttl: 20 * 60 * 1000,
      }),
    }),
  );

  await app.listen(6060);
}
bootstrap();
