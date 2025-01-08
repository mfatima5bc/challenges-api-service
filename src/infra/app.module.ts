import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { HttpControllersModule } from './http/graphql/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    // ClientsModule.register([
    //   {
    //     name: 'challenges',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'challenges-consumer',
    //         brokers: ['localhost:29092'],
    //       },
    //       consumer: {
    //         groupId: 'challenges-consumer',
    //         allowAutoTopicCreation: true,
    //       },
    //       subscribe: {}
    //     },
    //   },
    // ]),
    EnvModule,
    DatabaseModule,
    MessagingModule,
    HttpControllersModule,
  ],
  providers: [],
})
export class AppModule {}
