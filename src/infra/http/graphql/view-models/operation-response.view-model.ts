// delete-response.dto.ts
import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface ResponseData<T> {
  success: boolean;
  message?: string;
  data?: T | null;
}

export function responseData<T>(objResponse?: Type<T>): Type<ResponseData<T>> {
  @ObjectType({ isAbstract: true })
  abstract class Response implements ResponseData<T> {
    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(() => [objResponse], { nullable: true })
    data?: T;
  }
  return Response as Type<ResponseData<T>>;
}

export function responseNoData<T>(): Type<ResponseData<T>> {
  @ObjectType({ isAbstract: true })
  abstract class Response implements ResponseData<T> {
    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;
  }
  return Response as Type<ResponseData<T>>;
}