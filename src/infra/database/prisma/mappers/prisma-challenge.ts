import { UniqueEntityID } from '@/core/entities/unique-id';
import { Challenge } from '@/domain/entities/challenge';
import { Prisma, Challenge as PrismaChallenge } from '@prisma/client';

export class PrismaChallengeMapper {
  static toDomain(raw: PrismaChallenge): Challenge {
    return Challenge.create(
      {
        description: raw.description,
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(challenge: Challenge): Prisma.ChallengeUncheckedCreateInput {
    return {
      description: challenge.description,
      title: challenge.title,
      id: challenge.id.toString(),
      createdAt: challenge.createdAt,
      updatedAt: challenge.updatedAt,
    };
  }
}
