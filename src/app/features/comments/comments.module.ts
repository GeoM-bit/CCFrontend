import {NgModule} from "@angular/core";
import { CommentsComponent } from './components/comments/comments.component';
import {CommonModule} from "@angular/common";
import {CommentsService} from "../../core/services/comments.service";
import { CommentComponent } from './components/comment/comment.component';
import {MatCardAvatar} from "@angular/material/card";
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, MatCardAvatar, ReactiveFormsModule, MatFormField, MatInput, MatIconButton, MatIcon],
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  exports: [CommentsComponent],
  providers: [CommentsService]
})
export class CommentsModule {}
