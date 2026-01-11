import type { DomainError } from '@/domain/domain-error';
import { UserNotFoundError } from '@/domain/user/user.errors';
import { HttpStatus } from '@/http/http-status';

export const userErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([[UserNotFoundError, { status: HttpStatus.NOT_FOUND, message: 'User not found' }]]);
