import { DomainError } from '../domain-error';

export class WorkspaceNotFoundError extends DomainError {
  readonly code = 'WORKSPACE_NOT_FOUND';

  constructor() {
    super('Workspace not found');
    this.name = 'WorkspaceNotFoundError';
  }
}
