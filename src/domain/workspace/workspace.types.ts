export type WorkspacePreviewDto = {
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
};
