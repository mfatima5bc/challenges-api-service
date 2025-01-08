import { Field, InputType } from "@nestjs/graphql";
import { PaginationArgs } from "./pagination-params.args";

@InputType()
export class fetchChallengesInput extends PaginationArgs {

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string
}
