import { SaveSubmissionUseCase } from '@/domain/use-cases/save-submission';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { UpdateSubmissionEventController } from './controllers/update-submission.controller';
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaProducerService } from './kafka.service';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), EnvModule],
  providers: [KafkaProducerService, KafkaConsumerService, SaveSubmissionUseCase], // KafkaConsumerService
  exports: [KafkaProducerService, KafkaConsumerService], // KafkaConsumerService
  controllers: [UpdateSubmissionEventController],
})
export class MessagingModule {}
