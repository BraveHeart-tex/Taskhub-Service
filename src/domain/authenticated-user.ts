import type { User } from '@/db/schema';

export type AuthenticatedUser = Omit<User, 'passwordHash'>;
