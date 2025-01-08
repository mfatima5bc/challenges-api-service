import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteChallengeInput {
  @Field()
  id: string
}
