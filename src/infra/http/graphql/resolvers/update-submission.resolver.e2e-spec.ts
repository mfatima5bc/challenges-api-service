import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';
import { SubmissionFactory } from 'test/factories/make-submission';

describe('Submission create E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let challengeFactory: ChallengeFactory;
  let submissionFactory: SubmissionFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ChallengeFactory, SubmissionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    challengeFactory = moduleRef.get(ChallengeFactory);
    submissionFactory = moduleRef.get(SubmissionFactory);

    await app.init();
  });

  it('Should be able to update a submission status and score', async () => {
    const challenge = await challengeFactory.makePrismaChallenge();
    const submission = await submissionFactory.makePrismaSubmission(
      {},
      challenge.id,
    );

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            updateSubmission(data: { 
              submissionId: "${submission.id.toString()}", 
              score: 7,
              status: Done
            }) {
              success
              data {
                id 
                status
                score
              }
            }
          }
        `,
      });

    const {
      data: {
        updateSubmission: { success, data },
      },
    } = response.body;

    expect(success).toBe(true);
    expect(data).toEqual(expect.objectContaining({
      status: 'Done',
      score: 7
    }))
  });
});
