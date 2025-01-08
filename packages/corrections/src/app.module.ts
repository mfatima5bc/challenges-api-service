import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    MessagingModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
