import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../../../core/services/comments.service";
import {Comment} from "../../types/comment";
import {ActiveComment} from "../../types/activeComment";
import {CreateCommentModel} from "../../types/createCommentModel";
import {PostId} from "../../../posts/types/postId";
import {UpdateComment} from "../../types/updateComment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input() currentUser!: string;
  @Input() postId!: string;

  comments : Comment[] = [];
  parentComments: Comment[] = [];
  activeComment: ActiveComment | null = null;
  newComment: CreateCommentModel = new CreateCommentModel();
  postIdDto: PostId = new PostId();
  updateCommentModel: UpdateComment = new UpdateComment();

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.postIdDto.postId = this.postId;
    this.commentsService.getComments(this.postIdDto).subscribe(comments => {
      this.comments = comments;
      console.log(comments);
      this.parentComments = this.comments
        .filter(comment => comment.parentId == null);
    });
  }

  addComment({text, parentId}: {text:string, parentId: null | string}){
    this.newComment.parentId=parentId;
    this.newComment.body=text;
    this.newComment.postId=this.postId;
    this.commentsService.createComment(this.newComment).subscribe(createdComment => {
      this.comments = [...this.comments, createdComment];
      this.activeComment = null;
      this.getComments();
    });
  }

  updateComment({text, commentId}: {text: string, commentId:string}){
    this.updateCommentModel.body = text;
    this.commentsService.updateComment(commentId, this.updateCommentModel).subscribe((updatedComment)=>{
      this.comments = this.comments.map(comment =>{
        if(comment.id === commentId){
          this.getComments();
          return updatedComment;
        }
        return comment;
      });
      this.activeComment = null;
    })
  }

  deleteComment(commentId: string){
    this.commentsService.deleteComment(commentId).subscribe(()=> {
      this.getComments();
    });
  }

  getReplies(commentId: string): Comment[]{
    return this.comments
      .filter(comment => comment.parentId===commentId);
  }

  setActiveComment(activeComment: ActiveComment | null){
    this.activeComment = activeComment;
  }
}
