import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentInterface} from "../../types/comment.interface";
import {ActiveCommentTypeEnum} from "../../types/activeCommentType.enum";
import {ActiveCommentInterface} from "../../types/activeComment.interface";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  @Input() currentUser!: string;
  @Input() replies!: CommentInterface[];
  @Input() comment!: CommentInterface;
  @Input() activeComment! : ActiveCommentInterface | null;
  @Input() parentId: string | null =null;

  @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output() addComment = new EventEmitter<{text: string, parentId: string | null}>();
  @Output() updateComment = new EventEmitter<{text: string, commentId: string}>();
  @Output() deleteComment = new EventEmitter<string>();

  ngOnInit(): void {
    const fiveMinutes = 300000;
    const timePassed = new Date().getMilliseconds() - new Date(this.comment.createdAt).getMilliseconds() > fiveMinutes;
    this.canReply = Boolean(this.currentUser);
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
