import type { PaginationParams } from '@/core/types/pagination-params';
import type { Challenge } from '@/domain/entities/challenge';

export abstract class ChallengeRepository {
  abstract create(challenge: Challenge): Promise<void>;
  abstract save(challenge: Challenge): Promise<void>;
  abstract findById(id: string): Promise<Challenge | null>;
  abstract findMany(
    params: PaginationParams,
    title?: string,
    description?: string,
  ): Promise<{ hasMorePages: boolean, challenges: Challenge[] }>;
  abstract delete(challenge: Challenge): Promise<void>;
}
