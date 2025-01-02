import { Field, InputType } from "@nestjs/graphql";
import { CreateChallengeInput } from "./create-challenge.input";

@InputType()
export class UpdateChallengeInput extends CreateChallengeInput {
  @Field()
  id: string
}
