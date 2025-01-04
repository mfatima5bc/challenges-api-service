import { PaginationParams } from '@/core/types/pagination-params';
import { StatusOptions, Submission } from '@/domain/entities/submission';
import { SubmissionRepository } from '@/domain/repositories/submission-repository';
import { Injectable } from '@nestjs/common';
import { PrismaSubmissionMapper } from '../mappers/prisma-submission';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaSubmissionRepository implements SubmissionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Submission | void> {
    const data = await this.prisma.submission.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    return PrismaSubmissionMapper.toDomain(data);
  }

  async save(submission: Submission): Promise<void> {
    const data = PrismaSubmissionMapper.toPrisma(submission);

    await this.prisma.submission.update({
      where: { id: data.id.toString() },
      data,
    });
  }

  async findMany(
    { limit, page }: PaginationParams,
    challengeId: string,
    status?: StatusOptions,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ hasMorePages: boolean; submissions: Submission[] | [] }> {
    
    const submissions = await this.prisma.$transaction([
      this.prisma.submission.count({
        where: {
          challengeId,
          status,
          createdAt: { gte: startDate, lte: endDate }
        },
      }),
      this.prisma.submission.findMany({
        where: {
          challengeId,
          status,
          createdAt: { gte: startDate, lte: endDate }
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit,
      })
    ]);

    return { 
      hasMorePages: submissions[1].length === limit && (submissions[0] / limit) !== page,
      submissions: submissions[1].map(PrismaSubmissionMapper.toDomain)
    };
  }

  async create(submission: Submission): Promise<void> {
    const data = PrismaSubmissionMapper.toPrisma(submission);

    await this.prisma.submission.create({ data });
  }
}
