import { UniqueEntityID } from "@/core/entities/unique-id";
import type { HttpAdapter } from "@/core/types/http-adapter";
import { error, success, type ResponseType } from "@/core/types/response-type";
import githubUrlValidation from "@/core/utils/github-url-valdiator";
import { Injectable } from "@nestjs/common";
import { Submission } from "../entities/submission";
import InvalidRepoError from "../errors/invalid-repo";
import ResourceNotFoundError from "../errors/resouce-not-found";
import type { ChallengeRepository } from "../repositories/challenge-repository";
import type { SubmissionRepository } from "../repositories/submission-repository";

interface submissionUseCaseInput {
  repository: string;
  challengeId: string;
}

type SubmissionUseCaseOutput = ResponseType<
  ResourceNotFoundError | InvalidRepoError, 
  {submission: Submission}
>

@Injectable()
export class CreateSubmissionUseCase {
  constructor(
    private submissionRepository: SubmissionRepository, 
    private challengeRepository: ChallengeRepository,
    private httpService: HttpAdapter
  ) {}

  async handle({ challengeId, repository }: submissionUseCaseInput): Promise<SubmissionUseCaseOutput> {
    const challenge = await this.challengeRepository.findById(challengeId);

    if (!challenge) {
      return error(new ResourceNotFoundError());
    }

    const { isValid, user, repo } = githubUrlValidation(repository);
    const repoData = await this.httpService.request({ url: `https://api.github.com/repos/${user}/${repo}`, method: 'get' })

    if (!isValid || repoData.status !== 200 || !repoData) {
      return error(new InvalidRepoError(repository));
    }

    const submission = Submission.create({
      challengeId: new UniqueEntityID(challengeId),
      repository,
    });

    await this.submissionRepository.create(submission);

    return success({submission});
  }
}
