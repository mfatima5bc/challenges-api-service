import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { EnvService } from '../env/env.service';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    config: ConfigService,
    private envService: EnvService,
  ) {
    super({
      client: {
        clientId: 'corrections',
        brokers: [envService.get('KAFKA_BROKERS')], // envService.get('KAFKA_BROKERS')
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
