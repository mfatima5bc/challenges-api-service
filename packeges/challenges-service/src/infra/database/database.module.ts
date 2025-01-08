import { ChallengeRepository } from "@/domain/repositories/challenge-repository";
import { SubmissionRepository } from "@/domain/repositories/submission-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaChallengeRepository } from "./prisma/repository/prisma-challenge-repository";
import { PrismaSubmissionRepository } from "./prisma/repository/prisma-submission-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ChallengeRepository,
      useClass: PrismaChallengeRepository,
    },
    {
      provide: SubmissionRepository,
      useClass: PrismaSubmissionRepository,
    },
  ],
  exports: [PrismaService, ChallengeRepository, SubmissionRepository]
})
export class DatabaseModule {}
