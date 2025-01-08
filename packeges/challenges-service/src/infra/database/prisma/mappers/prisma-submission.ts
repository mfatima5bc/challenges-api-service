import { UniqueEntityID } from '@/core/entities/unique-id';
import { Submission } from '@/domain/entities/submission';
import { Prisma, Submission as PrismaSubmission } from '@prisma/client';

export class PrismaSubmissionMapper {
  static toDomain(raw: PrismaSubmission): Submission {
    return Submission.create(
      {
        challengeId: new UniqueEntityID(raw.challengeId),
        score: Number(raw.score),
        status: raw.status,
        repository: raw.repoUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(submission: Submission): Prisma.SubmissionUncheckedCreateInput {
    return {
      score: submission.score,
      status: submission.status,
      repoUrl: submission.repository,
      challengeId: submission.challengeId.toString(),
      id: submission.id.toString(),
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };
  }
}
