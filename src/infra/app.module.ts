import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { HttpControllersModule } from './http/graphql/http.module';
import { DateScalar } from './http/graphql/scalars/date.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpControllersModule,
    DatabaseModule,
    EnvModule,
  ],
  providers: [],
})
export class AppModule {}
