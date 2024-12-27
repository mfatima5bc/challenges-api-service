import { success, type ResponseType } from "@/core/types/response-type";
import { Challenge } from "../entities/challenge";
import type { ChallengeRepository } from "../repositories/challenge-repository";
import type { PaginationParams } from "@/core/types/pagination-params";

interface FetchChallengeInput {
  params: PaginationParams;
  title?: string;
  description?: string;
}

type FetchChallengeOutput = ResponseType<
  null,
  { hasMorePages: boolean, challenges: Challenge[] }>

export default class FetchChallengesUseCase {
  constructor(private repository: ChallengeRepository) {}

  async handle({ title, description, params }: FetchChallengeInput): Promise<FetchChallengeOutput> {

    const { hasMorePages, challenges } = await this.repository.findMany(params, title, description);

    return success({  hasMorePages, challenges });
  }
}
