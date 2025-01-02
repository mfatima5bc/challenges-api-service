import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { HttpControllersModule } from './http/graphql/http.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }), 
    HttpControllersModule,
    DatabaseModule,
    EnvModule
  ],
  providers: []
})
export class AppModule {}
