import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

describe('UpdateTaskController e2e test', () => {
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

  describe('PUT /tasks', () => {
    test('should be able update the task title', async () => {
      const created = await prismaService.task.create({
        data: {
          title: 'Task to update',
        },
      });

      const res = await request(app.getHttpServer())
        .put(`/tasks/${created.id}`)
        .send({
          title: 'New title tasks',
        });

      expect(res.statusCode).toBe(200);
    });
  });
});
