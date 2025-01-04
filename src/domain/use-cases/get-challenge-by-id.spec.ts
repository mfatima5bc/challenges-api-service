import { UniqueEntityID } from "@/core/entities/unique-id";
import { makeChallenge } from "test/factories/make-challenge";
import { InMemoryChallengeRepository } from "test/repositories/in-memory-challenge-repository";
import ResourceNotFoundError from "../errors/resouce-not-found";
import { GetChallengeByIdUseCase } from "./get-challenge-by-id";

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: GetChallengeByIdUseCase;

describe('Get challenge by Id', () => {
  beforeEach(async () => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();
    sut = new GetChallengeByIdUseCase(inMemoryChallengeRepository);
    
    const challenge1 = makeChallenge({
      title: 'Challenge Nodejs',
      description: 'Should be able to', 
    }, new UniqueEntityID('test'));
    await inMemoryChallengeRepository.create(challenge1);

  });

  it('Should be able to get a challenge BY ID', async () => {
    const result = await sut.handle({ id: 'test' });
    
    expect(result.isSuccess()).toBe(true);
    expect(result.data).toEqual({
      challenge: expect.objectContaining({
        title: 'Challenge Nodejs'
      })
    });
  })

  it('Should not able to get a un existent challenge', async () => {
    const result = await sut.handle({ id: 'no-exists' });
    
    expect(result.isError()).toBe(true);
    expect(result.data).toBeInstanceOf(ResourceNotFoundError);
  })
})
