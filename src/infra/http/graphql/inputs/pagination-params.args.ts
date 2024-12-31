import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  page: number = 0;

  @Field(() => Int)
  limit: number = 10;
}
