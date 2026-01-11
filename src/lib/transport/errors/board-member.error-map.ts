import {
  BoardMemberAlreadyExistsError,
  BoardMemberNotFoundError,
} from '@/domain/board/board-member/board-member.errors';
import type { DomainError } from '@/domain/domain-error';
import { HttpStatus } from '@/http/http-status';

export const boardMemberErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([
  [
    BoardMemberNotFoundError,
    { status: HttpStatus.NOT_FOUND, message: 'Board member not found' },
  ],
  [
    BoardMemberAlreadyExistsError,
    { status: HttpStatus.CONFLICT, message: 'Board member already exists' },
  ],
]);
