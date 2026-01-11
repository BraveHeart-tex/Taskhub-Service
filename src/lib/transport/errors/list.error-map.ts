import {
  InvalidListTitleError,
  ListNotFoundError,
} from '@/domain/board/list/list.errors';
import type { DomainError } from '@/domain/domain-error';
import { HttpStatus } from '@/http/http-status';

export const listErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([
  [ListNotFoundError, { status: HttpStatus.NOT_FOUND, message: 'List not found' }],
  [InvalidListTitleError, { status: HttpStatus.BAD_REQUEST, message: 'Invalid list title' }],
]);
