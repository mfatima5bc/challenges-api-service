import { AdapterModule } from '@/infra/adapters/adapter.module';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';
import { SubmissionFactory } from 'test/factories/make-submission';

describe('Submissions list (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let challengeFactory: ChallengeFactory;
  let submissionFactory: SubmissionFactory;
  let challengeId: String;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AdapterModule],
      providers: [ChallengeFactory, SubmissionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    challengeFactory = moduleRef.get(ChallengeFactory);
    submissionFactory = moduleRef.get(SubmissionFactory);

    await app.init();

    const challenge = await challengeFactory.makePrismaChallenge({ title: 'Socket chat app', description: 'nodejs' } );
    challengeId = challenge.id.toString();

    await submissionFactory.makePrismaSubmission({}, challenge.id);
    await submissionFactory.makePrismaSubmission({}, challenge.id);
    await submissionFactory.makePrismaSubmission({}, challenge.id);
    await submissionFactory.makePrismaSubmission({}, challenge.id);
    await submissionFactory.makePrismaSubmission({}, challenge.id);
  });

  it('Query submissions paginated', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          fetchSubmissions(
            params: {
              challengeId: "${challengeId}"
              page: 1, 
              limit: 2
              status: Pending
              startDate: "2025-01-01"
              endDate: "2025-01-06"
            }
          ) {
            items {
              status
            }
            hasMorePages
          }
        }
      `,
      });
    const { data: { fetchSubmissions: { hasMorePages, items } } } = response.body;

    expect(hasMorePages).toBe(true);
    expect(items.length).toBe(2);
  });


});
