import {Component, Inject, OnInit} from '@angular/core';
import {NewPostModel} from "../../../../models/newPostModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/customValidators";
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import {GroupPostsService} from "../../../core/services/groupPosts.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SnackBarComponent} from "../../common/snack-bar/snack-bar.component";
import {PostDto} from "../../../../models/postDto";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {PostPreviewComponent} from "../post-preview/post-preview.component";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  newPostModel: NewPostModel;
  postForm: FormGroup;
  postContent: string="";
  postDto: PostDto = new PostDto();

  constructor(private postService: GroupPostsService,
              private dialog: MatDialog,
              private snackBar: SnackBarComponent,
              private authService: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public groupName: String,
              private dialogRef: MatDialogRef<CreatePostComponent>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.postForm = new FormGroup({
      'title': new FormControl(null,[Validators.required, CustomValidators.WhitespaceInput]),
      'content': new FormControl(null, [Validators.required, CustomValidators.WhitespaceInputQuillEditor])
    });
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.postContent = event['editor']['root']['innerHTML'];
    this.postForm.patchValue({
      content: this.postContent
    });
    this.resizeAndCenterImages();
  }

  private resizeAndCenterImages() {
    const images = document.querySelectorAll('.ql-editor img');
    images.forEach((img: HTMLImageElement) => {
      img.style.maxWidth = '40%';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.margin = '0 auto';
    });
  }

  onSubmit(){
    if(!this.postForm.invalid) {
      this.newPostModel = this.postForm.value;
      this.newPostModel.content = this.postContent;
      this.newPostModel.supportGroupName = this.groupName;
      this.postService.createPost(this.newPostModel).subscribe((response: boolean) => {
        if (response) {
          this.dialogRef.close(true);
          this.snackBar.openSnackBar('Postarea a fost creată cu succes!','');
        } else {
          this.snackBar.openSnackBar('Postarea nu a putut fi creată!','');
        }
      });
    }
  }

  onPreviewClicked(){
    this.newPostModel = this.postForm.value;
    this.postDto.content = this.postContent;
    this.postDto.title = this.newPostModel.title;
    this.postDto.authorName = this.authService.getUserName();
    this.dialog.open(PostPreviewComponent, {
      width: '80%',
      data: this.postDto
    });
  }
}
