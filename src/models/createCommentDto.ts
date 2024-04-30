export class CreateCommentDto{
  body: String;
  parentId: String | null;
  postId: String;
}
