import type {
  Workspace,
  WorkspaceCreateInput,
  WorkspaceUpdateInput,
} from '../db/schema';
import { UnauthorizedError } from '../domain/auth/auth.errors';
import {
  WorkspaceNameAlreadyExistsError,
  WorkspaceNotFoundError,
} from '../domain/workspace/workspace.errors';
import type { WorkspaceRepo } from './workspace.repo';

export interface WorkspaceService {
  create(values: WorkspaceCreateInput): Promise<Workspace>;
  update(params: {
    workspaceId: Workspace['id'];
    changes: WorkspaceUpdateInput;
    currentUserId: Workspace['ownerId'];
  }): Promise<Workspace>;
  delete(
    currentUserId: Workspace['ownerId'],
    workspaceId: Workspace['id']
  ): Promise<void>;
}

export function createWorkspaceService(
  workspaceRepo: WorkspaceRepo
): WorkspaceService {
  return {
    async create(values) {
      const existing = await workspaceRepo.findByOwnerAndName(
        values.ownerId,
        values.name
      );

      if (existing) {
        throw new WorkspaceNameAlreadyExistsError();
      }

      return await workspaceRepo.create(values);
    },
    async update({ workspaceId, changes, currentUserId }) {
      const workspace = await workspaceRepo.findById(workspaceId);

      if (!workspace) {
        throw new WorkspaceNotFoundError();
      }

      if (workspace.ownerId !== currentUserId) {
        throw new UnauthorizedError();
      }

      if (changes.name && changes.name !== workspace.name) {
        const existing = await workspaceRepo.findByOwnerAndName(
          workspace.ownerId,
          changes.name
        );

        if (existing) {
          throw new WorkspaceNameAlreadyExistsError();
        }
      }

      return await workspaceRepo.update(workspaceId, changes);
    },
    async delete(currentUserId, workspaceId) {
      const workspace = await workspaceRepo.findById(workspaceId);

      if (!workspace) {
        throw new WorkspaceNotFoundError();
      }

      if (workspace.ownerId !== currentUserId) {
        throw new UnauthorizedError();
      }

      await workspaceRepo.delete(workspaceId);
    },
  };
}
