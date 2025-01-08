import { FetchSubmissionsUseCase } from '@/domain/use-cases/fetch-submissions';
import { GetChallengeByIdUseCase } from '@/domain/use-cases/get-challenge-by-id';
import {
  Args,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FetchSubmissionsInput } from '../inputs/fetch-submissions.input';
import { Submission } from '../models/submission.model';
import { ChallengeViewModel } from '../view-models/challenge.view-model';
import { PaginatedResponse } from '../view-models/paginated-data.view-model';
import { SubmissionViewModel } from '../view-models/submission.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@ObjectType()
class SubmissionsResponse extends PaginatedResponse(Submission) {}

@Resolver(() => Submission)
export class SubmissionsResolver {
  constructor(
    private readonly submissionsUseCase: FetchSubmissionsUseCase,
    private readonly challengeByIdUseCase: GetChallengeByIdUseCase,
  ) {}

  @ResolveField()
  async challenge(@Parent() submission: Submission) {
    const result = await this.challengeByIdUseCase.handle({
      id: submission.challengeId,
    });
    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);
    return ChallengeViewModel.toGraphQl(result.data.challenge);
  }

  @Query(() => SubmissionsResponse)
  async fetchSubmissions(
    @Args('params')
    {
      challengeId,
      status,
      startDate,
      endDate,
      page,
      limit,
    }: FetchSubmissionsInput,
  ): Promise<SubmissionsResponse | UseCaseErrorViewModel> {

    const result = await this.submissionsUseCase.handle({
      challengeId,
      status,
      startDate,
      endDate,
      params: { page, limit },
    });

    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);

    return {
      hasMorePages: result.data.hasMorePages,
      items: result.data.submissions.map(SubmissionViewModel.toGraphQl),
    };
  }
}
