import crypto from 'node:crypto';

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function getSessionExpiry(days = 30): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
