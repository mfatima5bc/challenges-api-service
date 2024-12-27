import { HttpAdapter } from "@/core/types/http-adapter";
import { CreateSubmissionUseCaseTest } from "@/domain/use-cases/create-submission-test";
import { Module } from "@nestjs/common";
import { AdapterModule } from "../adapters/adapter.module";
import { AxiosAdapter } from "../adapters/axios/axios.service";
import { TestController } from "./controllers/test.controller";

@Module({
  imports: [AdapterModule],
  controllers: [TestController],
  providers: [CreateSubmissionUseCaseTest]
})
export class HttpControllersModule {}
