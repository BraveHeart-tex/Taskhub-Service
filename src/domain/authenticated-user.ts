import type { UserRow } from '@/db/schema';

export type AuthenticatedUser = Omit<UserRow, 'passwordHash'>;
