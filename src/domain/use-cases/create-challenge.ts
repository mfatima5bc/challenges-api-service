import { success, type ResponseType } from '@/core/types/response-type';
import { Challenge } from '../entities/challenge';
import { ChallengeRepository } from '../repositories/challenge-repository';

interface CreateChallengeUseCaseInput {
  title: string;
  description: string;
}

type CreateChallengeUseCaseOutput = ResponseType<
  null,
  { challenge: Challenge }
>;

export default class CreateChallengeUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle(
    challenge: CreateChallengeUseCaseInput,
  ): Promise<CreateChallengeUseCaseOutput> {
    const challengeObject = Challenge.create(challenge);
    await this.repository.create(challengeObject);

    return success({ challenge: challengeObject });
  }
}
