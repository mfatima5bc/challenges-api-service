import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateChallengeInput } from '../inputs/create-challenge.input'
import { Challenge } from '../models/challenge.model'
import { ChallengeViewModel } from '../view-models/challenge.view-model'

@Resolver(() => Challenge)
export class CreateChallengeResolver {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(@Args('data') data: CreateChallengeInput) {
    const { value: { challenge } } = await this.createChallengeUseCase.handle({ title: data.title, description: data.description });
    return ChallengeViewModel.toGraphQl(challenge);
  }
}
