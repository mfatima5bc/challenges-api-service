import { DeleteChallengeUseCase } from '@/domain/use-cases/delete-challenge';
import { Args, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { DeleteChallengeInput } from '../inputs/delete-challenge.input';
import { Challenge } from '../models/challenge.model';
import { responseNoData } from '../view-models/operation-response.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@ObjectType()
class DeleteResponse extends responseNoData() {}

@Resolver(() => Challenge)
export class DeleteChallengeResolver {
  constructor(
    private readonly deleteChallengeUseCase: DeleteChallengeUseCase,
  ) {}

  @Mutation(() => DeleteResponse)
  async deleteChallenge(
    @Args('data') { id }: DeleteChallengeInput,
  ): Promise<DeleteResponse | UseCaseErrorViewModel> {
    const result = await this.deleteChallengeUseCase.handle({ id });

    if (result.isError()) return UseCaseErrorViewModel.toGraphQl(result.data);

    return {
      success: true,
      message: 'Operation success',
      data: null
    };
  }
}
