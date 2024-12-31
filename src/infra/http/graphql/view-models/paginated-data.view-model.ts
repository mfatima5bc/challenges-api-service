import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IPaginatedResult<T> {
  items: T[];
  hasMorePages: boolean;
}

export function PaginatedResponse<T>(classRef: Type<T>): Type<IPaginatedResult<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedResult<T> {
    @Field()
    hasMorePages: boolean;

    @Field(() => [classRef], { nullable: true })
    items: T[];
  }
  return PaginatedType as Type<IPaginatedResult<T>>;
}

