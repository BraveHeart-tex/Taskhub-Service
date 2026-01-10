export interface CreateCardParams {
  currentUserId: string;
  title: string;
  description?: string;
  listId: string;
  boardId: string;
}
