import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-id';
import type { Optional } from '@/core/types/optional';

export interface ChallengeProps {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Challenge extends Entity<ChallengeProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch()
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ChallengeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const challenge = new Challenge(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    // CHECK maybe send kafka message here...
    return challenge;
  }
}
