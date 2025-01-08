import { GetChallengeByIdUseCase } from '@/domain/use-cases/get-challenge-by-id';
import { SaveSubmissionUseCase } from '@/domain/use-cases/save-submission';
import { Args, Mutation, ObjectType, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateSubmissionInput } from '../inputs/update-submission.input';
import { Submission } from '../models/submission.model';
import { ChallengeViewModel } from '../view-models/challenge.view-model';
import { responseData } from '../view-models/operation-response.view-model';
import { SubmissionViewModel } from '../view-models/submission.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@ObjectType()
class UpdateSubmissionResponse extends responseData(Submission) {}

@Resolver(() => Submission)
export class UpdateSubmissionResolver {
  constructor(
    private readonly saveSubmissionUseCase: SaveSubmissionUseCase,
    private readonly challengeByIdUseCase: GetChallengeByIdUseCase,
    // private readonly kafka: KafkaService,
  ) {}

  @ResolveField()
  async challenge(@Parent() submission: Submission) {
    const result = await this.challengeByIdUseCase.handle({
      id: submission.challengeId,
    });
    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);
    return ChallengeViewModel.toGraphQl(result.data.challenge);
  }

  @Mutation(returns => UpdateSubmissionResponse)
  async updateSubmission(
    @Args('data') { submissionId, grade, status }: UpdateSubmissionInput,
  ): Promise<UpdateSubmissionResponse | UseCaseErrorViewModel> {
    const result = await this.saveSubmissionUseCase.handle({
      submissionId,
      score: grade,
      status,
    });

    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);

    return {
      success: true,
      message: 'Successfully updated',
      data: SubmissionViewModel.toGraphQl(result.data.submission),
    };
  }

  @EventPattern('corrections.correction')
  // @MessagePattern('corrections.correction')
  async updateSubmissionEvent(
    @Payload() data: UpdateSubmissionInput,
  ): Promise<UpdateSubmissionResponse | UseCaseErrorViewModel> {
    console.log('chegou', data);
    const { submissionId, grade, status } = data;
    const result = await this.saveSubmissionUseCase.handle({
      submissionId,
      score: grade,
      status,
    });

    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);

    return {
      success: true,
      message: 'Successfully updated',
      data: SubmissionViewModel.toGraphQl(result.data.submission),
    };
  }
}
