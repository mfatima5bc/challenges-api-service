import { Directive, Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Challenge } from "./challenge";

export enum SubmissionStatus {
  Pending,
  Done,
  Error
}

registerEnumType(SubmissionStatus, {
  name: 'SubmissionStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
@Directive('@key(fields: "challengeId")')
export class Submission {
  @Field(() => ID)
  id: string;

  @Field(() => Challenge)
  challenge: Challenge;

  challengeId: string;

  @Field()
  repository: string;

  @Field(() => SubmissionStatus)
  status: SubmissionStatus

  @Field(() => Number)
  score: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
