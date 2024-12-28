import { error, ResponseType, success } from '@/core/types/response-type';
import { StatusOptions, Submission } from '../entities/submission';
import ResourceNotFoundError from '../errors/resouce-not-found';
import { SubmissionRepository } from '../repositories/submission-repository';

interface SaveSubmissionUseCaseInput {
  submissionId: string;
  score: number;
  status: StatusOptions;
}

type SaveSubmissionUseCaseOutput = ResponseType<
  ResourceNotFoundError,
  { submission: Submission }
>;

export class SaveSubmissionUseCase {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  async handle({
    submissionId,
    score,
    status,
  }: SaveSubmissionUseCaseInput): Promise<SaveSubmissionUseCaseOutput> {
    const submission = await this.submissionRepository.findById(submissionId);

    if (!submission) {
      return error(new ResourceNotFoundError());
    }

    submission.status = status;
    submission.score = score;

    await this.submissionRepository.save(submission);
    return success({ submission });
  }
}
