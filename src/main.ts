import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'node:fs';

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
  app.enableCors({ origin: ['http://127.0.0.1:3000'] });
  await app.listen(6060);
}
bootstrap();
