import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

describe('CreateTaskController e2e test', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prismaService = moduleRef.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /tasks', () => {
    test('should be able return a entity task created', async () => {
      const res = await request(app.getHttpServer()).post('/tasks').send({
        title: 'New task',
      });

      const hasTask = await prismaService.task.findFirst({
        where: {
          title: 'New task',
        },
      });

      expect(res.statusCode).toBe(201);
      expect(hasTask).toBeTruthy();
    });
  });
});
