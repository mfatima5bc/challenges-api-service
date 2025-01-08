import type { DomainError } from '../../core/errors/domain-error';

export default class ResourceNotFoundError
  extends Error
  implements DomainError
{
  constructor() {
    super('Resource not found');
  }
}
