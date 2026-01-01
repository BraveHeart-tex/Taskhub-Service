import type { Session, User } from '../db/schema';
import type { AuthenticatedUser } from '../domain/authenticated-user';
import type { SessionContext } from '../domain/session-context';

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function toSessionContext(session: Session): SessionContext {
  return {
    id: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt,
  };
}
