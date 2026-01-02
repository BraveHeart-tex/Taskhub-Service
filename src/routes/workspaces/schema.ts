import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(100),
});

export const workspaceSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(100),
  ownerId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const deleteWorkspaceParamsSchema = z.object({
  id: z.uuid(),
});

export const updateWorkspaceParamsSchema = z.object({
  id: z.uuid(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100),
});
