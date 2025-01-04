import { CreateSubmissionUseCase } from '@/domain/use-cases/create-submission';
import { GetChallengeByIdUseCase } from '@/domain/use-cases/get-challenge-by-id';
import {
  Args,
  Mutation,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateSubmissionInput } from '../inputs/create-submission.input';
import { Submission } from '../models/submission.model';
import { responseData } from '../view-models/operation-response.view-model';
import { SubmissionViewModel } from '../view-models/submission.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@ObjectType()
class CreateSubmissionResponse extends responseData(Submission) {}

@Resolver(() => Submission)
export class CreateSubmissionResolver {
  constructor(
    private readonly createSubmissionUseCase: CreateSubmissionUseCase,
    private readonly challengeByIdUseCase: GetChallengeByIdUseCase,
  ) {}

  @ResolveField()
  async challenge(@Parent() submission: Submission) {
    const result = await this.challengeByIdUseCase.handle({
      id: submission.challengeId,
    });
    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);
    return result.data.challenge;
  }

  @Mutation(() => CreateSubmissionResponse)
  async createSubmission(
    @Args('data') { challengeId, repository }: CreateSubmissionInput,
  ): Promise<CreateSubmissionResponse | UseCaseErrorViewModel> {
    const result = await this.createSubmissionUseCase.handle({ challengeId, repository });

    if (result.isError()) {
      return UseCaseErrorViewModel.toGraphQl(result.data);
    }

    return {
      success: true,
      data: SubmissionViewModel.toGraphQl(result.data.submission),
    };
  }
}
