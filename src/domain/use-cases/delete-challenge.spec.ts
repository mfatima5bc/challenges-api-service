import { UniqueEntityID } from '@/core/entities/unique-id';
import { makeChallenge } from 'test/factories/make-challenge';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import { DeleteChallengeUseCase } from './delete-challenge';

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: DeleteChallengeUseCase;

describe('Delete challenge', () => {
  beforeEach(() => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();

    sut = new DeleteChallengeUseCase(inMemoryChallengeRepository);
  });

  it('Should be possible to delete a challenge', async () => {
    const challenge = makeChallenge({}, new UniqueEntityID('challenge-1'));

    await inMemoryChallengeRepository.create(challenge);

    await sut.handle({ id: 'challenge-1' });

    expect(inMemoryChallengeRepository.items).toHaveLength(0);
  });

  it('Should not be possible to delete a non-existent challenge', async () => {
    const challenge = makeChallenge({}, new UniqueEntityID('challenge-1'));

    await inMemoryChallengeRepository.create(challenge);

    const response = await sut.handle({ id: 'challenge-2' });

    expect(inMemoryChallengeRepository.items).toHaveLength(1);
    expect(response.isError()).toBe(true);
  });
});
