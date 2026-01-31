import {
  BoardAccessDeniedError,
  BoardNotFoundError,
  BoardTitleAlreadyExistsError,
  InvalidBoardTitleError,
} from '@/domain/board/board.errors';
import type { DomainError } from '@/domain/domain-error';
import { HttpStatus } from '@/http/http-status';

export const boardErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([
  [
    InvalidBoardTitleError,
    { status: HttpStatus.BAD_REQUEST, message: 'Invalid board title' },
  ],
  [
    BoardNotFoundError,
    { status: HttpStatus.NOT_FOUND, message: 'Board not found' },
  ],
  [
    BoardTitleAlreadyExistsError,
    { status: HttpStatus.CONFLICT, message: 'Board title already exists' },
  ],
  [
    BoardAccessDeniedError,
    { status: HttpStatus.FORBIDDEN, message: 'Board access required' },
  ],
]);
