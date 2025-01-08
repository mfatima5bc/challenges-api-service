import { SaveSubmissionUseCase } from '@/domain/use-cases/save-submission';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { z } from 'zod';

interface UpdateSubmissionMessage {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

const schemaSubmission = z.object({
  submissionId: z.string(),
  repositoryUrl: z.string(),
  grade: z.number(),
  status: z.enum(['Pending', 'Error', 'Done'])
})

@Controller()
export class UpdateSubmissionEventController {
  constructor(private readonly saveSubmissionUseCase: SaveSubmissionUseCase) {}

  @MessagePattern('corrections.correction')
  async handlerEvent(@Payload() data: UpdateSubmissionMessage) {
    const isValid = schemaSubmission.safeParse(data);

    if (!isValid.success) {
      // log something
      // console.log(data, isValid)
      return;
    }

    const { submissionId = "", grade, status = "Done" } = data;
    const result = await this.saveSubmissionUseCase.handle({
      submissionId,
      score: grade,
      status,
    });

    if (result.isError()) {
      // log error
      return;
    }
  }
}
