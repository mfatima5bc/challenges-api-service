import { makeChallenge } from "test/factories/make-challenge";
import { InMemoryChallengeRepository } from "test/repositories/in-memory-challenge-repository";
import { FetchChallengesUseCase } from "./fetch-challenge";

let inMemoryChallengeRepository: InMemoryChallengeRepository;
let sut: FetchChallengesUseCase;

describe('Fetch challenges', () => {
  beforeEach(async () => {
    inMemoryChallengeRepository = new InMemoryChallengeRepository();
    sut = new FetchChallengesUseCase(inMemoryChallengeRepository);
    
    const challenge1 = makeChallenge({
      title: 'Challenge Nodejs',
      description: 'Should be able to', 
    });
    await inMemoryChallengeRepository.create(challenge1);
    for (let i = 0; i < 3; i ++) {
      const challenge2 = makeChallenge();
      const challenge3 = makeChallenge();
      const challenge4 = makeChallenge();
      const challenge5 = makeChallenge({
        title: 'Challenge solid',
        description: 'Should be able to create a solidjs app', 
      });

      await inMemoryChallengeRepository.create(challenge2);
      await inMemoryChallengeRepository.create(challenge3);
      await inMemoryChallengeRepository.create(challenge4);
      await inMemoryChallengeRepository.create(challenge5);
    }
  });

  it('Should be able to list challenge paginated', async () => {
    const firstPage = await sut.handle({ params: {page: 1, limit: 10} });
    expect(firstPage.value?.challenges.length).toBe(10);

    const secondPage = await sut.handle({ params: {page: 2, limit: 10} });
    expect(secondPage.value?.challenges.length).toBeLessThanOrEqual(5);
    expect(secondPage.value?.hasMorePages).toBe(false);
  })

  it('Should be able to list challenge with filters', async () => {
    const firstPage = await sut.handle({ 
      title: 'Challenge Nodejs',
      description: 'Should be able to', 
      params: {
        page: 1, 
        limit: 10 
      }
    });
    expect(firstPage.isSuccess()).toBe(true);
    expect(firstPage.value?.challenges.length).toBeLessThanOrEqual(10);
    expect(firstPage.value?.challenges).toEqual(expect.arrayContaining([
      expect.objectContaining({
        title: 'Challenge Nodejs',
        description: 'Should be able to',
      })
    ]));
  })
})
