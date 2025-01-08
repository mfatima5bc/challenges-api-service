import type { PaginationParams } from '@/core/types/pagination-params';
import type { Challenge } from '@/domain/entities/challenge';
import type { ChallengeRepository } from '@/domain/repositories/challenge-repository';

export class InMemoryChallengeRepository implements ChallengeRepository {
  public items: Challenge[] = [];

  async create(challenge: Challenge): Promise<void> {
    this.items.push(challenge);
  }
  async save(challenge: Challenge): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === challenge.id);

    this.items[itemIndex] = challenge;
  }
  async findById(id: string): Promise<Challenge | null> {
    const challenge = this.items.find((item) => item.id.toString() === id);

    if (!challenge) return null;

    return challenge;
  }
  async findMany(
    { page, limit }: PaginationParams,
    title?: string,
    description?: string,
  ): Promise<{ hasMorePages: boolean, challenges: Challenge[] }> {
    const challenges = [...this.items]
      .filter(
        (item) =>
          title || description ? 
          (item.title === title ||
          item.title.includes(title)) ||
          (item.description === description ||
          item.description.includes(description)) : item
      )
      .slice((page - 1) * limit, page * limit);
    const hasMorePages = limit * page <= this.items.length;
    return {challenges, hasMorePages };
  }
  async delete(challenge: Challenge): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === challenge.id);

    this.items.splice(itemIndex, 1);
  }
}
