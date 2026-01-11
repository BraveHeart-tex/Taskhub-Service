import { CardNotFoundError } from '@/domain/card/card.errors';
import type { DomainError } from '@/domain/domain-error';
import { HttpStatus } from '@/http/http-status';

export const cardErrorMap = new Map<
  new () => DomainError,
  { status: number; message: string }
>([[CardNotFoundError, { status: HttpStatus.NOT_FOUND, message: 'Card not found' }]]);
