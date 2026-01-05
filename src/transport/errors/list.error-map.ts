import { ListNotFoundError } from '@/domain/board/list/list.errors';
import type { DomainError } from '@/domain/shared/domain-error';

export const listErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([[ListNotFoundError, { status: 404, message: 'List not found' }]]);
