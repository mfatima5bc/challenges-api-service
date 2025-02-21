import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'corrections',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'corrections',
            brokers: [process.env.KAFKA_BROKERS],
          },
          consumer: {
            groupId: 'corrections-consumer',
          },
        },
      },
    ]),
    MessagingModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
