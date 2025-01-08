import { SaveChallengeUseCase } from '@/domain/use-cases/save-challenge';
import { Args, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { UpdateChallengeInput } from '../inputs/update-challenge.input';
import { Challenge } from '../models/challenge.model';
import { ChallengeViewModel } from '../view-models/challenge.view-model';
import { responseData } from '../view-models/operation-response.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@ObjectType()
class UpdateResponse extends responseData(Challenge) {}

@Resolver(() => Challenge)
export class UpdateChallengeResolver {
  constructor(private readonly saveChallengeUseCase: SaveChallengeUseCase) {}

  @Mutation(returns => UpdateResponse)
  async updateChallenge(
    @Args('data') { id, description, title }: UpdateChallengeInput,
  ): Promise<UpdateResponse | UseCaseErrorViewModel> {
    const data = await this.saveChallengeUseCase.handle({
      id,
      description,
      title,
    });

    if (data.isError()) {
      return UseCaseErrorViewModel.toGraphQl(data.value);
    }

    return {
      success: true,
      message: 'Successfully updated',
      data: ChallengeViewModel.toGraphQl(data.value.challenge)
    };
  }
}
