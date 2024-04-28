import {NgModule} from "@angular/core";
import { CommentsComponent } from './components/comments/comments.component';
import {CommonModule} from "@angular/common";
import {CommentsService} from "../../core/services/comments.service";
import { CommentComponent } from './components/comment/comment.component';
import {MatCardAvatar} from "@angular/material/card";
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, MatCardAvatar, ReactiveFormsModule],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  exports: [CommentsComponent],
  providers: [CommentsService]
})
export class CommentsModule {}
