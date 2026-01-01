import type { AuthenticatedUser } from '../domain/authenticated-user';
import type { SessionContext } from '../domain/session-context';

export type SessionValidationResult = {
  user: AuthenticatedUser;
  session: SessionContext;
} | null;
