import { DomainError } from '@/domain/shared/domain-error';

export class ListNotFoundError extends DomainError {
  readonly code = 'LIST_NOT_FOUND';
  constructor() {
    super(`List not found`);
    this.name = 'ListNotFoundError';
  }
}
