import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSubmissionInput {
  @Field()
  repository: string;

  @Field()
  challengeId: string;
}
