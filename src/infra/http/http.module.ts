import { Module } from '@nestjs/common';
import { AdapterModule } from '../adapters/adapter.module';
import { TestController } from './controllers/test.controller';

@Module({
  imports: [AdapterModule],
  controllers: [TestController],
  providers: [],
})
export class HttpControllersModule {}
