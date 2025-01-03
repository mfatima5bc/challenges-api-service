import { AdapterModule } from '@/infra/adapters/adapter.module';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ChallengeFactory } from 'test/factories/make-challenge';

describe('Challenges list (E2E)', () => {
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

    await challengeFactory.makePrismaChallenge({ title: 'Socket chat app', description: 'nodejs' });
    await challengeFactory.makePrismaChallenge({ title: 'Admin with django', description: 'nodejs'});
    await challengeFactory.makePrismaChallenge({ title: 'Mobile app', description: 'react native app'});
    await challengeFactory.makePrismaChallenge();
    await challengeFactory.makePrismaChallenge();
  });

  it('Query challenges paginated', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          fetchChallenges(params: { page: 1, limit: 2 }) {
            items {
              title
            }
            hasMorePages
          }
        }
      `,
      });
    
    const { data: { fetchChallenges: { hasMorePages, items } } } = response.body;

    expect(hasMorePages).toBe(true);
    expect(items.length).toBe(2);
  });

  it('Query challenges paginated with title filter', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          fetchChallenges(params: { title: "Socket", page: 1, limit: 2 }) {
            items {
              title
            }
            hasMorePages
          }
        }
      `,
      });
    
    const { data: { fetchChallenges: { hasMorePages, items } } } = response.body;

    expect(hasMorePages).toBe(false);
    expect(items.length).toBe(1);
  });

  it('Query challenges paginated with filters', async () => {

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          fetchChallenges(params: { title: "Socket", description: "nodejs", page: 1, limit: 2 }) {
            items {
              title
            }
            hasMorePages
          }
        }
      `,
      });
    
    const { data: { fetchChallenges: { hasMorePages, items } } } = response.body;

    expect(hasMorePages).toBe(false);
    expect(items.length).toBe(1);
  });
});
