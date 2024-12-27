import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-id';
import type { Optional } from '@/core/types/optional';

enum Status {
  Pending = 'PENDING',
  Error = 'ERROR',
  Done = 'DONE',
}

type StatusOptions = keyof typeof Status;

export interface SubmissionProps {
  challengeId: UniqueEntityID;
  repository: string;
  status: StatusOptions;
  score?: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Submission extends Entity<SubmissionProps> {
  get repository() {
    return this.props.repository;
  }

  get challengeId() {
    return this.props.challengeId;
  }

  get status() {
    return this.props.status;
  }

  set status(status: StatusOptions) {
    this.props.status = status;
    this.touch();
  }

  get score() {
    return this.props.score;
  }

  set score(score: number) {
   this.props.score = score;
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
    props: Optional<SubmissionProps, 'createdAt' | 'status' | 'score'>,
    id?: UniqueEntityID,
  ) {
    const submission = new Submission(
      {
        status: 'Pending',
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return submission;
  }
}
