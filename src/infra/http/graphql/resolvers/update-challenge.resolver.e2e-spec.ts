import { AdapterModule } from '@/infra/adapters/adapter.module';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';

describe('Challenges update (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let challengeFactory: ChallengeFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AdapterModule],
      providers: [ChallengeFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    challengeFactory = moduleRef.get(ChallengeFactory);

    await app.init();
  });

  it(' should be able to update a challenge', async () => {
    const challenge = await challengeFactory.makePrismaChallenge({ title: 'teste', description: 'nodejs' });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          updateChallenge(data: { id: "${challenge.id.toString()}", title: "New title", description: "new desc" }) {
            success
            data {
              title
              description
            }
          }
        }
      `,
    });
    const { data: { updateChallenge: { success, data } } } = response.body;

    expect(success).toBe(true);
    expect(data).toEqual(expect.objectContaining({
      title: 'New title',
      description: 'new desc'
    }))
  });

  it.skip('should not be able to delete challenge a non existent challenge', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          deleteChallenge(data: { id: "teste" }) {
            success
          }
        }
      `,
    });
    const { errors } = response.body;

    expect(errors).toEqual(expect.arrayContaining([
      expect.objectContaining({
        message: 'Resource not found',
      })
    ]));
  });

});