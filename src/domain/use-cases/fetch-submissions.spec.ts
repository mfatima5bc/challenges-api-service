import { UniqueEntityID } from '@/core/entities/unique-id';
import { makeChallenge } from 'test/factories/make-challenge';
import { makeSubmission } from 'test/factories/make-submission';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import { InMemorySubmissionRepository } from 'test/repositories/in-memory-submission-repository';
import { FetchSubmissionsUseCase } from './fetch-submissions';

let inMemorySubmissionRepository: InMemorySubmissionRepository;
let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: FetchSubmissionsUseCase;

describe('Fetch challenges', () => {
  beforeEach(async () => {
    inMemorySubmissionRepository = new InMemorySubmissionRepository();
    inMemoryChallengeRepository = new InMemoryChallengeRepository();
    sut = new FetchSubmissionsUseCase(
      inMemorySubmissionRepository,
      inMemoryChallengeRepository,
    );

    const challenge1 = makeChallenge({}, new UniqueEntityID('challenge1'));
    const challenge2 = makeChallenge({}, new UniqueEntityID('challenge1'));
    const challenge3 = makeChallenge({}, new UniqueEntityID('challenge1'));
    inMemoryChallengeRepository.create(challenge1);
    inMemoryChallengeRepository.create(challenge2);
    inMemoryChallengeRepository.create(challenge3);

    for (let i = 1; i <= 10; i++) {
      const submission1 = makeSubmission(
        { createdAt: new Date(2024, 11, 12), status: 'Done' },
        challenge1.id,
      );
      inMemorySubmissionRepository.create(submission1);
      const submission2 = makeSubmission(
        { createdAt: new Date(2024, 11, 22) },
        challenge2.id,
      );
      inMemorySubmissionRepository.create(submission2);
      const submission3 = makeSubmission(
        { createdAt: new Date(2024, 11, 24) },
        challenge3.id,
      );
      inMemorySubmissionRepository.create(submission3);
    }
  });

  it('Should be able to list submissions by challenge and status paginated', async () => {
    const firstPage = await sut.handle({
      params: { page: 1, limit: 5 },
      challengeId: 'challenge1',
      status: 'Done',
    });
    expect(firstPage.isSuccess()).toBe(true);
    expect(firstPage.value).toEqual(
      expect.objectContaining({
        submissions: expect.any(Array),
        hasMorePages: true,
      }),
    );

    const secondPage = await sut.handle({
      challengeId: 'challenge1',
      status: 'Done',
      params: { page: 2, limit: 5 },
    });

    expect(secondPage.isSuccess()).toBe(true);
    if (secondPage.isSuccess()) {
      expect(secondPage.value.submissions.length).toBeLessThanOrEqual(5);
    }
    expect(secondPage.value).toEqual(
      expect.objectContaining({
        submissions: expect.any(Array),
        hasMorePages: false,
      }),
    );
  });

  it('Should be able to list submissions by challenge and date range paginated', async () => {
    const firstPage = await sut.handle({
      challengeId: 'challenge1',
      startDate: new Date(2024, 11, 23),
      endDate: new Date(2024, 11, 25),
      params: { page: 1, limit: 6 },
    });
    expect(firstPage.isSuccess()).toBe(true);
    if (firstPage.isSuccess()) {
      expect(firstPage.value?.submissions.length).toBe(6);
      expect(firstPage.value?.submissions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: new Date(2024, 11, 24),
          }),
        ]),
      );
    }

    const secondPage = await sut.handle({
      challengeId: 'challenge1',
      startDate: new Date(2024, 11, 23),
      endDate: new Date(2024, 11, 25),
      params: { page: 2, limit: 10 },
    });
    expect(secondPage.isSuccess()).toBe(true);
    if (secondPage.isSuccess()) {
      expect(secondPage.value?.submissions.length).toBeLessThanOrEqual(5);
      expect(secondPage.value?.hasMorePages).toBe(false);
    }
  });
});
