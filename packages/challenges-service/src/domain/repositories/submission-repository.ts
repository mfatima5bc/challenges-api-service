import type { PaginationParams } from '@/core/types/pagination-params';
import type { StatusOptions, Submission } from '@/domain/entities/submission';

export abstract class SubmissionRepository {
  abstract create(submission: Submission): Promise<void>;
  abstract findById(id: string): Promise<Submission | void>;
  abstract save(submission: Submission): Promise<void>;
  abstract findMany(
    params: PaginationParams,
    challengeId: string,
    status?: StatusOptions,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ hasMorePages: boolean, submissions: Submission[] | [] }>;
}
