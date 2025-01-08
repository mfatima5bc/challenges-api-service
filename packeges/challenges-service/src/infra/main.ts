import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { KafkaConsumerService } from './messaging/kafka-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  const kafkaConsumerService = app.get(KafkaConsumerService)
  // const kafkaService = app.get(KafkaService)

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
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
