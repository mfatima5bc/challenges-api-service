import { Submission } from "@/domain/entities/submission";

export class SubmissionViewModel {
  static toGraphQl(submission: Submission) {
    return {
      id: submission.id.toString(),
      repository: submission.repository,
      challengeId: submission.challengeId.toString(),
      score: submission.score,
      status: submission.status,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt
    }
  }
}
