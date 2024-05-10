export interface CommentInterface{
  id: string;
  body: string;
  username: string;
  author: string;
  parentId: string | null;
  createdAt: string;
}
