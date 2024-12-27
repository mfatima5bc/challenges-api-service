import { error, success, type ResponseType } from '@/core/types/response-type';
import type { ChallengeRepository } from '../repositories/challenge-repository';
import ResourceNotFoundError from '@/domain/errors/resouce-not-found';

interface DeleteChallengeUseCaseInput {
  id: string;
}

type DeleteChallengeUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  {}
>;

export class DeleteChallengeUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle({
    id,
  }: DeleteChallengeUseCaseInput): Promise<DeleteChallengeUseCaseOutput> {
    const challenge = await this.repository.findById(id);

    if (!challenge) {
      return error(new ResourceNotFoundError());
    }

    await this.repository.delete(challenge);
    return success({});
  }
}
