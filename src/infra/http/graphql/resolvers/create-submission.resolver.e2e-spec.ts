import { AdapterModule } from '@/infra/adapters/adapter.module';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';

describe('Submission create E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let challengeFactory: ChallengeFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AdapterModule],
      providers: [
        ChallengeFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    challengeFactory = moduleRef.get(ChallengeFactory);

    await app.init();
  });

  it('Should be able to create a submission', async () => {
    const challenge = await challengeFactory.makePrismaChallenge();

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createSubmission(data: { challengeId: "${challenge.id.toString()}", repository: "https://github.com/mfatima5bc/forum-backend-app-nest-clean" }) {
              success
              data {
                id 
                repository
                challengeId
                challenge {
                  title
                }
                status
              }
            }
          }
        `,
      });

    const {
      data: {
        createSubmission: { data, success },
      },
    } = response.body;

    expect(success).toBe(true);
    expect(data).toEqual(
      expect.objectContaining({
        challengeId: challenge.id.toString(),
        repository:
          'https://github.com/mfatima5bc/forum-backend-app-nest-clean',
      }),
    );
  });
});
