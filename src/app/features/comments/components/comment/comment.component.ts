import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../types/comment";
import {ActiveCommentType} from "../../types/activeCommentType";
import {ActiveComment} from "../../types/activeComment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentType;
  replyId: string | null = null;

  @Input() currentUser!: string;
  @Input() replies!: Comment[];
  @Input() comment!: Comment;
  @Input() activeComment! : ActiveComment | null;
  @Input() parentId: string | null =null;

  @Output() setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output() addComment = new EventEmitter<{text: string, parentId: string | null}>();
  @Output() updateComment = new EventEmitter<{text: string, commentId: string}>();
  @Output() deleteComment = new EventEmitter<string>();

  ngOnInit(): void {
    const fiveMinutes = 300000;
    const timePassed = new Date().getTime() - new Date(this.comment.createdAt).getTime() > fiveMinutes;
    this.canReply = Boolean(this.currentUser) && this.comment.parentId == null;
    this.canEdit = this.currentUser===this.comment.username && !timePassed;
    this.canDelete = this.currentUser===this.comment.username && !timePassed && this.replies.length===0;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean{
    if(!this.activeComment){
      return false;
    }

    return(
      this.activeComment.id ===this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean{
    if(!this.activeComment){
      return false;
    }

    return(
      this.activeComment.id ===this.comment.id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }
}
