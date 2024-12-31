import { FetchChallengesUseCase } from '@/domain/use-cases/fetch-challenge';
import { Args, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { fetchChallengesInput } from '../inputs/fetch-challenges.input';
import { Challenge } from '../models/challenge.model';
import { ChallengeViewModel } from '../view-models/challenge.view-model';
import { PaginatedResponse } from '../view-models/paginated-data.view-model';

@ObjectType()
class PaginatedChallenge extends PaginatedResponse(Challenge) {}

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly fetchChallengeUseCase: FetchChallengesUseCase
  ) {}

  @Query(returns => PaginatedChallenge) // ChallengeFetch
  async fetchChallenges(
    @Args('params') { title, description, limit = 10, page = 1 }: fetchChallengesInput,
  ): Promise<PaginatedChallenge> {
    const {
      value: { challenges, hasMorePages },
    } = await this.fetchChallengeUseCase.handle({
      title,
      description,
      params: { limit, page },
    });

    return {
      hasMorePages,
      items: challenges.map(ChallengeViewModel.toGraphQl),
    };
  }

}
