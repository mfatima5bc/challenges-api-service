import { ChallengeRepository } from "@/domain/repositories/challenge-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaChallengeRepository } from "./prisma/repository/prisma-challenge-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ChallengeRepository,
      useClass: PrismaChallengeRepository,
    },
  ],
  exports: [PrismaService, ChallengeRepository]
})
export class DatabaseModule {}
