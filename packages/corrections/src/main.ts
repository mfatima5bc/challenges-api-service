import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'corrections',
          brokers: [process.env.KAFKA_BROKERS], // process.env.KAFKA_BROKERS
        },
        consumer: {
          groupId: 'corrections-consumer',
        },
      },
    },
  );

  app.listen().then(() => {
    console.log('Corrections service is running!');
  });
}
bootstrap();
