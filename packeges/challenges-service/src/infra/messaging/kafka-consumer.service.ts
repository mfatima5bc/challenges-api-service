import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { EnvService } from '../env/env.service';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor(envService: EnvService) {
    super({
      subscribe: {fromBeginning: true},
      client: {
        requestTimeout: 10000,
        clientId: 'challenges',
        brokers: [envService.get('KAFKA_BROKERS')],
        // ssl: true,
        logLevel: logLevel.ERROR,
      },
      consumer: {
        groupId: 'challenges-consumer',
        allowAutoTopicCreation: false
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
