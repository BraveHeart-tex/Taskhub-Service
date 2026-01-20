import type { DomainError } from '@/domain/domain-error';
import { WorkspaceNotFoundError } from '@/domain/workspace/workspace.errors';
import { HttpStatus } from '@/http/http-status';

export const workspaceErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([
  [
    WorkspaceNotFoundError,
    { status: HttpStatus.NOT_FOUND, message: 'Workspace not found' },
  ],
]);
