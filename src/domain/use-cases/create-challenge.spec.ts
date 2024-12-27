import { UniqueEntityID } from '@/core/entities/unique-id';
import { InMemoryChallengeRepository } from 'test/repositories/in-memory-challenge-repository';
import CreateChallengeUseCase from './create-challenge';

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: CreateChallengeUseCase;

describe('Challenge', () => {
  beforeEach(() => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();

    sut = new CreateChallengeUseCase(inMemoryChallengeRepository);
  });

  it('Should be able to create a valid challenge', async () => {
    const data = {
      title: 'Nodejs streams exame',
      description:
        'You should implement a script to read a csv file with 10gb and sent the data to this service: http://gofile',
    };
    const result = await sut.handle(data);

    expect(result.isSuccess()).toBe(true);
    expect(result.value?.challenge).toEqual(expect.objectContaining(data));
    expect(result.value?.challenge.id).toBeInstanceOf(UniqueEntityID);
  });
});
