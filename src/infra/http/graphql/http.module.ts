import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge';
import { DeleteChallengeUseCase } from '@/domain/use-cases/delete-challenge';
import { FetchChallengesUseCase } from '@/domain/use-cases/fetch-challenge';
import { SaveChallengeUseCase } from '@/domain/use-cases/save-challenge';
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
import { DeleteChallengeResolver } from './resolvers/delete-challenge.resolver';
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

    // Resolvers
    ChallengesResolver, 
    CreateChallengeResolver, 
    UpdateChallengeResolver,
    DeleteChallengeResolver,
    DateScalar
  ],
})
export class HttpControllersModule {}
