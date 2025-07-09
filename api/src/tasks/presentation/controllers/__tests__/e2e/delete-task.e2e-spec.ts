import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

describe('DeleteTaskController e2e test', () => {
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

  describe('DELETE /tasks', () => {
    test('should be able delete a by id', async () => {
      const created = await prismaService.task.create({
        data: {
          title: 'Task to delete',
        },
      });

      const res = await request(app.getHttpServer()).delete(
        `/tasks/${created.id}`,
      );

      expect(res.statusCode).toBe(204);
    });
  });
});
