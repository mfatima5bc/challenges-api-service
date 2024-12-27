import { error, success, type ResponseType } from '@/core/types/response-type';
import type { ChallengeRepository } from '../repositories/challenge-repository';
import ResourceNotFoundError from '@/domain/errors/resouce-not-found';
import type { Challenge } from '../entities/challenge';

interface SaveChallengeUseCaseInput {
  id: string;
  title: string;
  description: string;
}

type SaveChallengeUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  { challenge: Challenge }
>;

export class SaveChallengeUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle({
    id,
    title,
    description
  }: SaveChallengeUseCaseInput): Promise<SaveChallengeUseCaseOutput> {
    const challengeObj = await this.repository.findById(id);

    if (!challengeObj) {
      return error(new ResourceNotFoundError());
    }

    challengeObj.title = title;
    challengeObj.description = description;

    await this.repository.save(challengeObj);

    return success({
      challenge: challengeObj
    });
  }
}
