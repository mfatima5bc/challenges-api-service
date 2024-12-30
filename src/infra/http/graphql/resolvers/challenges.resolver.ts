import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateChallenge } from '../inputs/create-challenge-input'
import { Challenge } from '../models/challenge'
import { ChallengeViewModel } from '../view-models/challenge.view-model'

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase
  ) {}

  @Mutation(() => Challenge)
  async createChallenge(@Args('data') data: CreateChallenge) {
    const { value: { challenge } } = await this.createChallengeUseCase.handle({ title: data.title, description: data.description });
    return ChallengeViewModel.toGraphQl(challenge);
  }
}
