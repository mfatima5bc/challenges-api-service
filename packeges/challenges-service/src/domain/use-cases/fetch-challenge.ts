import { PaginationParams } from "@/core/types/pagination-params";
import { ResponseType, success } from "@/core/types/response-type";
import { Injectable } from "@nestjs/common";
import { Challenge } from "../entities/challenge";
import { ChallengeRepository } from "../repositories/challenge-repository";

interface FetchChallengeInput {
  params: PaginationParams;
  title?: string;
  description?: string;
}

export type FetchChallengeOutput = ResponseType<
  null,
  { hasMorePages: boolean, challenges: Challenge[] }>

@Injectable()
export class FetchChallengesUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle({ title, description, params }: FetchChallengeInput): Promise<FetchChallengeOutput> {

    const { hasMorePages, challenges } = await this.repository.findMany(params, title, description);

    return success({  hasMorePages, challenges });
  }
}
