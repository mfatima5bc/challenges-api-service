import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChallenge {
  @Field()
  title: string;

  @Field()
  description: string;
}
