import { Module } from '@nestjs/common';
import { HttpControllersModule } from './http/graphql/http.module';


@Module({
  imports: [HttpControllersModule],
  providers: []
})
export class AppModule {}
