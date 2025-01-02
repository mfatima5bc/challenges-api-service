import type { UniqueEntityID } from '@/core/entities/unique-id';
import { Challenge, type ChallengeProps } from '@/domain/entities/challenge';
import { PrismaChallengeMapper } from '@/infra/database/prisma/mappers/prisma-challenge';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function makeChallenge(
  override: Partial<ChallengeProps> = {},
  id?: UniqueEntityID,
) {
  const challenge = Challenge.create(
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return challenge;
}

@Injectable()
export class ChallengeFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaChallenge(
    data: Partial<ChallengeProps> = {}
  ): Promise<Challenge> {
    const challenge = makeChallenge(data);

    await this.prisma.challenge.create({
      data: PrismaChallengeMapper.toPrisma(challenge),
    })

    return challenge;
  }
}
