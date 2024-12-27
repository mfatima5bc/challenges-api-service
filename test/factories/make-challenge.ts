import { faker } from '@faker-js/faker';
import type { UniqueEntityID } from '@/core/entities/unique-id';
import { Challenge, type ChallengeProps } from '@/domain/entities/challenge';

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
