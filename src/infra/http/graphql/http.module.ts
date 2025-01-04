import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge';
import { CreateSubmissionUseCase } from '@/domain/use-cases/create-submission';
import { DeleteChallengeUseCase } from '@/domain/use-cases/delete-challenge';
import { FetchChallengesUseCase } from '@/domain/use-cases/fetch-challenge';
import { GetChallengeByIdUseCase } from '@/domain/use-cases/get-challenge-by-id';
import { SaveChallengeUseCase } from '@/domain/use-cases/save-challenge';
import { SaveSubmissionUseCase } from '@/domain/use-cases/save-submission';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { AdapterModule } from '../../adapters/adapter.module';
import { DatabaseModule } from '../../database/database.module';
import { ChallengesResolver } from './resolvers/challenges.resolver';
import { CreateChallengeResolver } from './resolvers/create-challenge.resolver';
import { CreateSubmissionResolver } from './resolvers/create-submission.resolver';
import { DeleteChallengeResolver } from './resolvers/delete-challenge.resolver';
import { UpdateSubmissionResolver } from './resolvers/update-submission.resolver';
import { UpdateChallengeResolver } from './resolvers/update-challenge.resolver';
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    AdapterModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({ // TODO configure stacktrace erro just in development environment
      driver: ApolloFederationDriver,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      autoSchemaFile: {
        federation: 2,
        path: path.resolve(process.cwd(), 'src/schema.gql'),
      },
    }),
  ],
  providers: [
    CreateChallengeUseCase, 
    FetchChallengesUseCase,
    SaveChallengeUseCase,
    DeleteChallengeUseCase,
    CreateSubmissionUseCase,
    GetChallengeByIdUseCase,
    SaveSubmissionUseCase,
    
    // Resolvers
    ChallengesResolver, 
    CreateChallengeResolver, 
    UpdateChallengeResolver,
    DeleteChallengeResolver,
    CreateSubmissionResolver,
    UpdateSubmissionResolver,
    DateScalar

    // 
    
  ],
})
export class HttpControllersModule {}
