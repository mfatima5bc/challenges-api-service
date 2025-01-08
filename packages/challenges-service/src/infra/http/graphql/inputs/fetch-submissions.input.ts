import { Field, InputType } from "@nestjs/graphql";
import { SubmissionStatus } from "../models/submission.model";
import { PaginationArgs } from "./pagination-params.args";

@InputType()
export class FetchSubmissionsInput extends PaginationArgs {

  @Field()
  challengeId: string;

  @Field({ nullable: true })
  status?: SubmissionStatus

  @Field({ nullable: true })
  startDate?: Date

  @Field({ nullable: true })
  endDate?: Date
}
