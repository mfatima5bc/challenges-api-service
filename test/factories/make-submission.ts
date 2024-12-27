import { faker } from '@faker-js/faker';
import type { UniqueEntityID } from '@/core/entities/unique-id';
import { Submission, type SubmissionProps } from '@/domain/entities/submission';

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
