import { HttpAdapter } from '@/core/types/http-adapter';
import { success, type ResponseType } from '@/core/types/response-type';
import githubUrlValidation from '@/core/utils/github-url-valdiator';
import { Injectable } from '@nestjs/common';
import InvalidRepoError from '../errors/invalid-repo';
import ResourceNotFoundError from '../errors/resouce-not-found';

interface submissionUseCaseInput {
  repository: string;
  challengeId: string;
}

type SubmissionUseCaseOutput = ResponseType<
  ResourceNotFoundError | InvalidRepoError,
  { submission: string }
>;

@Injectable()
export class CreateSubmissionUseCaseTest {
  constructor(private httpService: HttpAdapter) {}

  async handle({
    challengeId,
    repository,
  }: submissionUseCaseInput): Promise<SubmissionUseCaseOutput> {
    const { isValid, user, repo } = githubUrlValidation(repository);
    console.log(user, repo)
    const repoData = await this.httpService.request({
      url: `https://api.github.com/repos/${user}/${repo}`,
      method: 'get',
    });

    console.log(isValid, repoData)
    if (!isValid || !repoData) {
      // return error(new InvalidRepoError(repository));
    }
    return success({ submission: repository });
  }
}
