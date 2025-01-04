import { error, ResponseType, success } from "@/core/types/response-type";
import { Injectable } from "@nestjs/common";
import { Challenge } from "../entities/challenge";
import ResourceNotFoundError from "../errors/resouce-not-found";
import { ChallengeRepository } from "../repositories/challenge-repository";

interface GetChallengeByIdInput {
  id: string;
}

export type GetChallengeByIdOutput = ResponseType<
  ResourceNotFoundError,
  { challenge: Challenge }>

@Injectable()
export class GetChallengeByIdUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle({ id }: GetChallengeByIdInput): Promise<GetChallengeByIdOutput> {

    const challenge = await this.repository.findById(id);

    if (!challenge) return error(new ResourceNotFoundError());

    return success({  challenge });
  }
}
