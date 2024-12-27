import type { DomainError } from '../../core/errors/domain-error';

export default class InvalidRepoError
  extends Error
  implements DomainError
{
  constructor(repo: string) {
    super(`You project repo ${repo} is not valid`);
  }
}
