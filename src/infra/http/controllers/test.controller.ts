import { Body, Controller, HttpCode, Post } from '@nestjs/common';

interface TestPayload {
  repository: string;
}

@Controller('/test')
export class TestController {
  constructor() // private useCase: CreateSubmissionUseCaseTest,
  // private axios: HttpAdapter
  {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body: TestPayload) {
    // const result = await this.useCase.handle({ challengeId: 'teste', repository: body.repository});
  }
}
