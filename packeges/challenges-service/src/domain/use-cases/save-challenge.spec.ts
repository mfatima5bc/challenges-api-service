import { UniqueEntityID } from '@/core/entities/unique-id';
import { makeChallenge } from 'test/factories/make-challenge';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import { SaveChallengeUseCase } from './save-challenge';
import ResourceNotFoundError from '@/domain/errors/resouce-not-found';

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: SaveChallengeUseCase;

describe('Challenge Save', () => {
  beforeEach(() => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();

    sut = new SaveChallengeUseCase(inMemoryChallengeRepository);
  });

  it('Should be able to save a valid challenge', async () => {
    const challenge = makeChallenge({}, new UniqueEntityID('challenge-1'));
    
    await inMemoryChallengeRepository.create(challenge);

    const data = {
      title: 'New exame',
      description:
        'You should implement a...',
    };
    const result = await sut.handle({ ...data, id: 'challenge-1'});
    
    expect(result.isSuccess()).toBe(true);
    expect(inMemoryChallengeRepository.items[0]).toEqual(expect.objectContaining(data));
  });

  it('Should not be able to save a non-existent challenge', async () => {
    const challenge = makeChallenge({}, new UniqueEntityID('challenge-1'));
    
    await inMemoryChallengeRepository.create(challenge);

    const data = {
      title: 'New exame',
      description:
        'You should implement a...',
    };
    const result = await sut.handle({ ...data, id: 'challenge-2'});

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  });
});
