import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Challenge {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  // @Field(() => [Submission])
  // submissions: Submission[]
}
