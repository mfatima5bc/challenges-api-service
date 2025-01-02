import { SaveChallengeUseCase } from '@/domain/use-cases/save-challenge';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateChallengeInput } from '../inputs/update-challenge.input';
import { Challenge } from '../models/challenge.model';
import { ChallengeViewModel } from '../view-models/challenge.view-model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';

@Resolver(() => Challenge)
export class UpdateChallengeResolver {
  constructor(private readonly saveChallengeUseCase: SaveChallengeUseCase) {}

  @Mutation(() => Challenge)
  async updateChallenge(
    @Args('data') { id, description, title }: UpdateChallengeInput,
  ): Promise<Challenge | UseCaseErrorViewModel> {
    const data = await this.saveChallengeUseCase.handle({
      id,
      description,
      title,
    });
    if (data.isError()) {
      return UseCaseErrorViewModel.toGraphQl(data.value);
    }
    return ChallengeViewModel.toGraphQl(data.value.challenge);
  }
}
