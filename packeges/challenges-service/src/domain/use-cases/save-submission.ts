import { error, ResponseType, success } from '@/core/types/response-type';
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SaveSubmissionUseCase {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  async handle({
    submissionId,
    score,
    status,
  }: SaveSubmissionUseCaseInput): Promise<SaveSubmissionUseCaseOutput> {
    const submissionObj = await this.submissionRepository.findById(submissionId);

    if (!submissionObj) {
      return error(new ResourceNotFoundError());
    }

    submissionObj.status = status;
    submissionObj.score = score;

    await this.submissionRepository.save(submissionObj);
    return success({ submission: submissionObj });
  }
}
