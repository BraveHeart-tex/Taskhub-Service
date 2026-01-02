import { customType } from 'drizzle-orm/pg-core';

export const customTimestamp = customType<{ data: string; driverData: string }>(
  {
    dataType() {
      return 'timestamptz';
    },
    toDriver(value): string {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid timestamp: ${value}`);
      }

      return date.toISOString();
    },
    fromDriver(value): string {
      const date = new Date(value);
      return date.toISOString();
    },
  }
);
