import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../../../core/services/comments.service";
import {CommentInterface} from "../../types/comment.interface";
import {ActiveCommentInterface} from "../../types/activeComment.interface";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input() currentUser!: string;
  @Input() postId!: string;

  comments : CommentInterface[] = [];
  activeComment: ActiveCommentInterface | null = null;
  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.commentsService.getComments('123').subscribe(comments => {
      this.comments = comments;
    })
  }

  addComment({text, parentId}: {text:string, parentId: null | string}){
    this.commentsService.createComment(text, parentId, this.postId).subscribe(createdComment => {
      this.comments = [...this.comments, createdComment];
      this.activeComment = null;
    })
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
      .filter(comment => comment.parentId===commentId)
      .sort((a,b)=> new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds());
  }

  setActiveComment(activeComment: ActiveCommentInterface | null){
    this.activeComment = activeComment;
  }
}
