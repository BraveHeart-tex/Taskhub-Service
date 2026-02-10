export interface WorkspacePreviewDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isCurrentUserOwner: boolean;
  memberCount: number;
  membersPreview: {
    id: string;
    name: string;
    avatarUrl: string | null;
  }[];
}

export interface WorkspaceContextDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isCurrentUserOwner: boolean;
  role: 'owner' | 'member';
}

export interface CreateWorkspaceInput {
  name: string;
  ownerId: string;
}
