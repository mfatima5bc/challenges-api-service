import { CreateChallengeUseCase } from '@/domain/use-cases/create-challenge';
import { FetchChallengesUseCase } from '@/domain/use-cases/fetch-challenge';
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
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    AdapterModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
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
    ChallengesResolver, 
    CreateChallengeResolver, 
    DateScalar
  ],
})
export class HttpControllersModule {}
