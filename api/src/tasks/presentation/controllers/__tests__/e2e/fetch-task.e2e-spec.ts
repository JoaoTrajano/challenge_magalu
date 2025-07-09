import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

describe('FetchTaskController e2e test', () => {
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

  describe('GET /tasks', () => {
    test('should be able return multiple entity tasks', async () => {
      await request(app.getHttpServer()).post('/tasks').send({
        title: 'New task',
      });
      const res = await request(app.getHttpServer()).get('/tasks');

      expect(res.body).haveOwnProperty('tasks');
      expect(res.body['tasks'].length > 0).toBeTruthy();
      expect(res.body['tasks'][0].title).toEqual('New task');
    });
  });

  describe('GET /tasks', () => {
    test('should be able return multiple entity tasks completed', async () => {
      await request(app.getHttpServer()).post('/tasks').send({
        title: 'First task',
      });

      await request(app.getHttpServer()).post('/tasks').send({
        title: 'Secound task',
      });

      await request(app.getHttpServer()).post('/tasks').send({
        title: 'Third task',
      });

      const secoundTask = await prismaService.task.findFirst({
        where: { title: 'Secound task' },
      });

      await prismaService.task.update({
        where: {
          id: secoundTask?.id,
        },
        data: {
          status: 'COMPLETED',
        },
      });

      const res = await request(app.getHttpServer())
        .get('/tasks')
        .query({ status: 'COMPLETED' });

      expect(res.body).haveOwnProperty('tasks');
      expect(res.body['tasks'].length > 0).toBeTruthy();
      expect(res.body['tasks'][0].title).toEqual('Secound task');
    });
  });

  describe('GET /tasks', () => {
    test('should be able return multiple entity tasks pending', async () => {
      await request(app.getHttpServer()).post('/tasks').send({
        title: 'First task',
      });

      await request(app.getHttpServer()).post('/tasks').send({
        title: 'Secound task',
      });

      await request(app.getHttpServer()).post('/tasks').send({
        title: 'Third task',
      });

      const secoundTask = await prismaService.task.findFirst({
        where: { title: 'Secound task' },
      });

      await prismaService.task.update({
        where: {
          id: secoundTask?.id,
        },
        data: {
          status: 'COMPLETED',
        },
      });

      const res = await request(app.getHttpServer())
        .get('/tasks')
        .query({ status: 'PENDING' });

      expect(res.body).haveOwnProperty('tasks');
      expect(res.body['tasks'].length > 1).toBeTruthy();
    });
  });
});
