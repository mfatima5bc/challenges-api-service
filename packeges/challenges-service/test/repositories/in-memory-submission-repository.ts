import type { PaginationParams } from '@/core/types/pagination-params';
import type { Submission } from '@/domain/entities/submission';
import type { SubmissionRepository } from '@/domain/repositories/submission-repository';

export class InMemorySubmissionRepository implements SubmissionRepository {
  public items: Submission[] = [];

  async create(submission: Submission): Promise<void> {
    this.items.push(submission);
  }

  async save(submission: Submission): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === submission.id);
    this.items[itemIndex] = submission;
  }

  async findById(id: string): Promise<Submission | null> {
    const submission = this.items.find((item) => item.id.toString() === id);

    if (!submission) return null;

    return submission;
  }

  async findMany(
    { page, limit }: PaginationParams,
    challengeId: string,
    status?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ hasMorePages: boolean, submissions: Submission[] }> {
    const submissionsFiltered = [...this.items]
      .filter(
        (item) =>
          item.challengeId.toString() === challengeId &&
          status ? item.status === status : item &&
          startDate && endDate ? item.createdAt >= startDate && item.createdAt <=endDate : item 
      );
    const submissions = submissionsFiltered
      .slice((page - 1) * limit, page * limit);
    const hasMorePages = limit * page < submissionsFiltered.length;
    return { submissions, hasMorePages };
  }

}
