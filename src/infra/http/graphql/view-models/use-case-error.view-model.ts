import { DomainError } from "@/core/errors/domain-error";
import { GraphQLError } from "graphql";

export class UseCaseErrorViewModel {
  static toGraphQl(error: DomainError) {
    return new GraphQLError(error.message)
  }
}
