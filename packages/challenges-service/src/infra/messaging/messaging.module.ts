import { SaveSubmissionUseCase } from '@/domain/use-cases/save-submission';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { UpdateSubmissionEventController } from './controllers/update-submission.controller';
import { KafkaProducerService } from './kafka.service';

@Module({
  imports: [
    DatabaseModule, 
    ConfigModule.forRoot(), 
    EnvModule,
    ClientsModule.register([
      {
        name: 'challenges',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'challenges',
            brokers: [process.env.KAFKA_BROKERS],
          },
          consumer: {
            groupId: 'challenges-consumer',
          },
        },
      },
    ]),
  ],
  providers: [SaveSubmissionUseCase, KafkaProducerService], // KafkaConsumerService
  exports: [KafkaProducerService], // KafkaConsumerService
  controllers: [UpdateSubmissionEventController],
})
export class MessagingModule {}
