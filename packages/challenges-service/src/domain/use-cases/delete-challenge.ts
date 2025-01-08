import { error, success, type ResponseType } from '@/core/types/response-type';
import { ChallengeRepository } from '../repositories/challenge-repository';
import ResourceNotFoundError from '@/domain/errors/resouce-not-found';
import { Injectable } from '@nestjs/common';

interface DeleteChallengeUseCaseInput {
  id: string;
}

type DeleteChallengeUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  {}
>;

@Injectable()
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
