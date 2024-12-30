import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateChallenge } from '../inputs/create-challenge-input'
import { Challenge } from '../models/challenge'

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase
  ) {}

  @Mutation(() => Challenge)
  createChallenge(@Args('data') data: CreateChallenge) {
    return this.createChallengeUseCase.handle({ title: data.title, description: data.description })
  }
}
