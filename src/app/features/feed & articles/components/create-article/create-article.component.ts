import {Component, OnInit} from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";
import {NewArticleModel} from "../../types/newArticleModel";
import {ArticleModel} from "../../types/articleModel";
import {ArticleService} from "../../../../core/services/article.service";
import {SnackBarComponent} from "../../../../core/components/snack-bar/snack-bar.component";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {CustomValidators} from "../../../../core/utils/customValidators";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit{
  newArticleModel: NewArticleModel = new NewArticleModel();
  articleModel: ArticleModel = new ArticleModel();
  articleForm: FormGroup;
  articleContent: string="";
  constructor(private articleService: ArticleService,
              private snackBar: SnackBarComponent,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private dialogRef: MatDialogRef<CreateArticleComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.articleContent = event['editor']['root']['innerHTML'];
    this.articleForm.patchValue({
      content: this.articleContent
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
    if(!this.articleForm.invalid) {
      this.newArticleModel = this.articleForm.value;
      this.newArticleModel.content = this.articleContent;
      this.articleService.createArticle(this.newArticleModel).subscribe((response: boolean) => {
        if (response) {
          this.dialogRef.close(true);
          this.openArticlePublishingSucceededSnackBar();
        } else {
          this.openArticlePublishingFailedSnackBar();
        }
      });
    }
  }

  initForm() {
    this.articleForm = new FormGroup({
      'title': new FormControl(null,[Validators.required, CustomValidators.WhitespaceInput]),
      'summary': new FormControl(null, [Validators.required, CustomValidators.SummaryLengthValidator, CustomValidators.WhitespaceInput]),
      'content': new FormControl(null, [Validators.required, CustomValidators.WhitespaceInputQuillEditor]),
      'titlePhotoContent': new FormControl(null, [Validators.required])
    });
  }

  onPreviewClicked() {
    this.newArticleModel = this.articleForm.value;
    this.newArticleModel.content = this.articleContent;
    this.articleModel.title = this.newArticleModel.title;
    this.articleModel.content = this.newArticleModel.content;
    this.articleModel.titlePhotoContent = this.newArticleModel.titlePhotoContent;
    this.articleModel.authorName = this.authService.getUserName();
    this.dialog.open(ArticlePreviewComponent, {
      width: '80%',
      data: this.articleModel
    });
  }

  openArticlePublishingSucceededSnackBar() {
    this.snackBar.openSnackBar('Articolul a fost publicat cu succes!','');
  }
  openArticlePublishingFailedSnackBar() {
    this.snackBar.openSnackBar('Articolul nu a putut fi publicat!','');
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.articleForm.get('titlePhotoContent')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }
}
