import { AdapterModule } from '@/infra/adapters/adapter.module';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';

describe('Challenges creation (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AdapterModule],
      providers: [ChallengeFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it(' should be able to create a challenge', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          createChallenge(data: { title: "New Title", description: "new description" }) {
            title
            description
          }
        }
      `,
    });    
    const { data: { createChallenge } } = response.body;

    expect(createChallenge).toEqual(expect.objectContaining({
      title: "New Title",
      description: "new description"
    }));
  });

  it('should not be able to create challenge without title and description', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          createChallenge(data: { }) {
            title
            description
          }
        }
      `,
    });
    
    const { errors } = response.body;
    
    expect(response.statusCode).toBe(400);
    expect(errors).toEqual(expect.arrayContaining([
      expect.objectContaining({
        message: expect.any(String),
      })
    ]));
  });

});
