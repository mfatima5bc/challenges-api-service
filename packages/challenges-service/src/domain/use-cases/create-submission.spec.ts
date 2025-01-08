import type { HttpAdapter } from '@/core/types/http-adapter';
import { makeChallenge } from 'test/factories/make-challenge';
import { FakeHttpNotFound } from 'test/http/fake-github-response-not-found';
import { FakeHttp } from 'test/http/fake-github-response-success';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import { InMemorySubmissionRepository } from 'test/repositories/in-memory-submission-repository';
import InvalidRepoError from '../errors/invalid-repo';
import { CreateSubmissionUseCase } from './create-submission';

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let inMemorySubmissionRepository: InMemorySubmissionRepository;
let httpService: HttpAdapter;
let sut: CreateSubmissionUseCase;

describe('Submission', () => {
  beforeEach(() => {
    inMemorySubmissionRepository = new InMemorySubmissionRepository();
    inMemoryChallengeRepository = new InMemoryChallengeRepository();
    httpService = new FakeHttp();

    sut = new CreateSubmissionUseCase(
      inMemorySubmissionRepository,
      inMemoryChallengeRepository,
      httpService
    );
  });

  it('Should be able to create a valid submission', async () => {
    const data = {
      title: 'Nodejs streams exame',
      description:
        'You should implement a script to read a csv file with 10gb and sent the data to this service: http://gofile',
    };
    const challenge = makeChallenge(data);
    await inMemoryChallengeRepository.create(challenge);

    const result = await sut.handle({
      repository: 'http://github.com/mfatima5bc/node-core-course',
      challengeId: challenge.id.toString(),
    });
    expect(result.isSuccess()).toBe(true);
    expect(inMemorySubmissionRepository.items[0]).toEqual(
      expect.objectContaining({
        repository: 'http://github.com/mfatima5bc/node-core-course',
      }),
    );
    expect(inMemorySubmissionRepository.items[0].challengeId).toEqual(
      challenge.id,
    );
  });

  it('Should not be able to  submit a invalid url repo', async () => {
    httpService = new FakeHttpNotFound();

    sut = new CreateSubmissionUseCase(
      inMemorySubmissionRepository,
      inMemoryChallengeRepository,
      httpService
    );

    const data = {
      title: 'Nodejs streams exame',
      description:
        'You should implement a script to read a csv file with 10gb and sent the data to this service: http://gofile',
    };
    const challenge = makeChallenge(data);
    await inMemoryChallengeRepository.create(challenge);

    const result = await sut.handle({
      repository: 'http://github.com/mfatima5bc/node',
      challengeId: challenge.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidRepoError)

  });
});
