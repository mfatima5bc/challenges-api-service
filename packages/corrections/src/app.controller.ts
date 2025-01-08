import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { z } from 'zod';
import { KafkaService } from './messaging/kafka.service';

interface CorrectLessonMessage {
  submissionId: string;
  repositoryUrl: string;
}

const schemaIncomingLesson = z.object({
  submissionId: z.string(),
  repositoryUrl: z.string(),
});

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Controller()
export class AppController {
  constructor(private readonly kafka: KafkaService) {}

  @MessagePattern('challenges.new-submission')
  correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): CorrectLessonResponse {
    const isValid = schemaIncomingLesson.safeParse(message);

    if (isValid.error) {
      return;
    }

    const { submissionId, repositoryUrl } = message;

    this.kafka.emit('corrections.correction', {
      value: {
        submissionId,
        repositoryUrl,
        grade: Math.floor(Math.random() * 10) + 1,
        status: 'Done',
      },
    });

    return {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
    };
  }
}
