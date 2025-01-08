import { faker } from '@faker-js/faker';
import type { UniqueEntityID } from '@/core/entities/unique-id';
import { Submission, type SubmissionProps } from '@/domain/entities/submission';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaSubmissionMapper } from '@/infra/database/prisma/mappers/prisma-submission';

export function makeSubmission(
  override: Partial<SubmissionProps> = {},
  challengeId: UniqueEntityID,
  id?: UniqueEntityID,
) {
  const submission = Submission.create(
    {
      challengeId,
      score: faker.number.int({ min: 0, max: 10 }),
      status: 'Pending',
      repository: faker.internet.url(),
      ...override,
    },
    id,
  );

  return submission;
}


@Injectable()
export class SubmissionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaSubmission(
    data: Partial<SubmissionProps> = {},
    challengeId: UniqueEntityID,
  ): Promise<Submission> {
    const submission = makeSubmission(data, challengeId);

    await this.prisma.submission.create({
      data: PrismaSubmissionMapper.toPrisma(submission),
    })

    return submission;
  }
}
