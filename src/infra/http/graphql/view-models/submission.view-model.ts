import { Submission } from '@/domain/entities/submission';
import { Submission as SubmissionInfra } from '../models/submission.model';
import { UniqueEntityID } from '@/core/entities/unique-id';

export class SubmissionViewModel {
  static toGraphQl(submission: Submission) {
    return {
      id: submission.id.toString(),
      repository: submission.repository,
      challengeId: submission.challengeId.toString(),
      score: submission.score,
      status: submission.status,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };
  }
  static toDomain(submission: SubmissionInfra) {
    return Submission.create(
      {
        repository: submission.repository,
        challengeId: new UniqueEntityID(submission.challengeId),
        score: submission.score,
        status: submission.status,
        createdAt: submission.createdAt,
        updatedAt: submission.updatedAt,
      },
      new UniqueEntityID(submission.id),
    );
  }
}
