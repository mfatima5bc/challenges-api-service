import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { EnvService } from '../env/env.service';

@Injectable()
export class KafkaProducerService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    config: ConfigService,
    private envService: EnvService
  ) {
    super({
      client: {
        clientId: 'challenges',
        brokers: [envService.get('KAFKA_BROKERS')], // envService.get('KAFKA_BROKERS')
      },
      consumer: {
        groupId: 'challenges-consumer',
        allowAutoTopicCreation: true
      },
      subscribe: {fromBeginning: true}
    })
  }

  async onModuleInit() {
    this.subscribeToResponseOf('corrections.correction')
    
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
