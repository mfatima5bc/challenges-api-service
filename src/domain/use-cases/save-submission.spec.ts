import { UniqueEntityID } from '@/core/entities/unique-id';
import { makeChallenge } from 'test/factories/make-challenge';
import { makeSubmission } from 'test/factories/make-submission';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import { InMemorySubmissionRepository } from 'test/repositories/in-memory-submission-repository';
import { SaveSubmissionUseCase } from './save-submission';

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let inMemorySubmissionRepository: InMemorySubmissionRepository;
let sut: SaveSubmissionUseCase;

describe('Submission save correction data', () => {
  beforeEach(() => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();
    inMemorySubmissionRepository = new InMemorySubmissionRepository();
    sut = new SaveSubmissionUseCase(inMemorySubmissionRepository);
  });

  it('Should be able to send a correction update to a submission', async () => {
    const challenge = makeChallenge({}, new UniqueEntityID('challenge1'));
    await inMemoryChallengeRepository.create(challenge);

    const submission = makeSubmission(
      { challengeId: challenge.id },
      new UniqueEntityID('submission1'),
    );
    await inMemorySubmissionRepository.create(submission);

    const savedData = await sut.handle({
      submissionId: submission.id.toString(),
      score: 10,
      status: 'Done',
    });

    expect(savedData.isSuccess()).toBe(true);
    expect(savedData.value).toEqual({
      submission: expect.objectContaining({
        id: submission.id,
        score: 10,
        status: 'Done',
      }),
    });
  });
});
