import { PaginationParams } from '@/core/types/pagination-params';
import { Challenge } from '@/domain/entities/challenge';
import { ChallengeRepository } from '@/domain/repositories/challenge-repository';
import { Injectable } from '@nestjs/common';
import { PrismaChallengeMapper } from '../mappers/prisma-challenge';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaChallengeRepository implements ChallengeRepository {
  constructor(private prisma: PrismaService) {}

  async create(challenge: Challenge): Promise<void> {
    const data = PrismaChallengeMapper.toPrisma(challenge);

    await this.prisma.challenge.count()
    await this.prisma.challenge.create({ data });
  }

  async findById(id: string): Promise<Challenge | null> {
    const data = await this.prisma.challenge.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    return PrismaChallengeMapper.toDomain(data);
  }

  async delete(challenge: Challenge): Promise<void> {
    const data = PrismaChallengeMapper.toPrisma(challenge);

    await this.prisma.challenge.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findMany(
    { limit, page }: PaginationParams,
    title?: string,
    description?: string,
  ): Promise<{ hasMorePages: boolean; challenges: Challenge[] }> {
    const challenges = await this.prisma.$transaction([
      this.prisma.challenge.count({
        where: {
          title: { contains: title },
          description: { contains: description },
        },
      }),
      this.prisma.challenge.findMany({
        where: {
          title: {
            contains: title,
          },
          description: {
            contains: description,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit,
      })
    ]);

    return {
      challenges: challenges[1].map(PrismaChallengeMapper.toDomain),
      hasMorePages: challenges[0] > limit,
    };
  }

  async save(challenge: Challenge): Promise<void> {
    const data = PrismaChallengeMapper.toPrisma(challenge);

    await this.prisma.challenge.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
