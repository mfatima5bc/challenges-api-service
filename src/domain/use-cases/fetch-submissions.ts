import { PaginationParams } from '@/core/types/pagination-params';
import { error, ResponseType, success } from '@/core/types/response-type';
import { StatusOptions, Submission } from '../entities/submission';
import ResourceNotFoundError from '../errors/resouce-not-found';
import { ChallengeRepository } from '../repositories/challenge-repository';
import { SubmissionRepository } from '../repositories/submission-repository';

interface FetchSubmissionsUseCaseInput {
  params: PaginationParams;
  challengeId: string;
  status?: StatusOptions;
  startDate?: Date;
  endDate?: Date;
}

type FetchSubmissionsUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  { submissions: Submission[], hasMorePages: boolean }
>;

export class FetchSubmissionsUseCase {
  constructor(
    private readonly SubmissionRepository: SubmissionRepository,
    private readonly ChallengeRepository: ChallengeRepository,
  ) {}

  async handle({
    challengeId,
    status,
    startDate,
    endDate,
    params: { limit, page },
  }: FetchSubmissionsUseCaseInput): Promise<FetchSubmissionsUseCaseOutput> {
    const challenge = await this.ChallengeRepository.findById(challengeId);

    if (!challenge) {
      return error(new ResourceNotFoundError());
    }

    const { submissions, hasMorePages } = await this.SubmissionRepository.findMany(
      { limit, page },
      challengeId,
      status,
      startDate,
      endDate,
    );

    return success({ submissions, hasMorePages });
  }
}
