import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { EnvService } from '@/shared/infrastructure/env/env.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  await app.listen(port || 3000, '0.0.0.0');
}

bootstrap();
