import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from '../env/env.module';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot(), EnvModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
