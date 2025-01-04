import { Field, InputType } from "@nestjs/graphql";
import { SubmissionStatus } from "../models/submission.model";

@InputType()
export class UpdateSubmissionInput {
  @Field()
  score: number;

  @Field()
  status: SubmissionStatus;

  @Field()
  submissionId: string;
}
