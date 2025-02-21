import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  // const kafkaConsumerService = app.get(KafkaConsumerService)
  // const kafkaService = app.get(KafkaService)

  app.connectMicroservice<MicroserviceOptions>({
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
  });

  app.startAllMicroservices().then(() => {
    console.log("[Challenges] Microservice is running!");
  }).catch((error) => console.log(error))
  
  app.listen(port).then(() => {
    console.log('[Challenges] Applications is running!')
  });

  app.enableShutdownHooks();
}
bootstrap();
