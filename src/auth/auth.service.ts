import { timingSafeEqual } from 'node:crypto';
import { toAuthenticatedUser, toSessionContext } from './auth.mappers';
import type { SessionValidationResult } from './auth.types';
import { hashSessionSecret } from './session';
import type { SessionRepo } from './session.repo';
import type { UserRepo } from './user.repo';

export function createAuthService(
  userRepo: UserRepo,
  sessionRepo: SessionRepo
) {
  return {
    async validateSession(
      token: string | undefined
    ): Promise<SessionValidationResult | null> {
      if (!token) return null;

      const [sessionId, secret] = token.split('.');

      if (!sessionId || !secret) return null;

      const session = await sessionRepo.findById(sessionId);
      if (!session) return null;

      if (session.expiresAt <= new Date()) {
        await sessionRepo.delete(session.id);
        return null;
      }

      const storedHash = Buffer.from(session.secretHash, 'base64');
      const computedHash = Buffer.from(await hashSessionSecret(secret));

      if (storedHash.length !== computedHash.length) {
        return null;
      }

      if (!timingSafeEqual(storedHash, computedHash)) {
        return null;
      }

      const user = await userRepo.findById(session.userId);
      if (!user) return null;

      return {
        user: toAuthenticatedUser(user),
        session: toSessionContext(session),
      };
    },
  };
}
