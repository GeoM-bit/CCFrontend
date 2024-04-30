import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../../../core/services/comments.service";
import {CommentInterface} from "../../types/comment.interface";
import {ActiveCommentInterface} from "../../types/activeComment.interface";
import {CreateCommentDto} from "../../../../../models/createCommentDto";
import {PostIdDto} from "../../../../../models/postIdDto";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input() currentUser!: string;
  @Input() postId!: string;

  comments : CommentInterface[] = [];
  parentComments: CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  newComment: CreateCommentDto = new CreateCommentDto();
  postIdDto: PostIdDto = new PostIdDto();

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.postIdDto.postId = this.postId;
    this.commentsService.getComments(this.postIdDto).subscribe(comments => {
      this.comments = comments;
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
    this.commentsService.updateComment(commentId, text).subscribe((updatedComment)=>{
      this.comments = this.comments.map(comment =>{
        if(comment.id === commentId){
          return updatedComment;
        }
        return comment;
      });
      this.activeComment = null;
    })
  }

  deleteComment(commentId: string){
    this.commentsService.deleteComment(commentId).subscribe(()=> {
      this.comments = this.comments.filter(comment => comment.id !== commentId)
    });
  }

  getReplies(commentId: string): CommentInterface[]{
    return this.comments
      .filter(comment => comment.parentId===commentId);
  }

  setActiveComment(activeComment: ActiveCommentInterface | null){
    this.activeComment = activeComment;
  }
}
