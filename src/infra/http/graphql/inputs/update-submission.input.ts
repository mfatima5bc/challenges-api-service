import { Field, InputType } from "@nestjs/graphql";
import { SubmissionStatus } from "../models/submission.model";

@InputType()
export class UpdateSubmissionInput {
  @Field()
  grade: number;

  @Field()
  status: SubmissionStatus;

  @Field()
  submissionId: string;

  @Field({nullable: true})
  repositoryUrl?: string;
}
