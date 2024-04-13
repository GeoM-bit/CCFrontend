import {Component, OnInit} from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewArticleModel} from "../../../../models/newArticleModel";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {ArticleService} from "../../../core/services/article.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomValidators} from "../../../core/utils/customValidators";
import {ArticleDto} from "../../../../models/articleDto";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ArticlePreviewComponent} from "../article-preview/article-preview.component";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit{
  articleModel: NewArticleModel;
  articleDto: ArticleDto = new ArticleDto();
  articleForm: FormGroup;
  articleContent: string="";
  constructor(private articleService: ArticleService, private snackBar: SnackBarComponent, private dialog: MatDialog, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
    }
  changedEditor(event: EditorChangeContent | EditorChangeSelection)
  {
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
      this.articleModel = this.articleForm.value;
      this.articleModel.content = this.articleContent;
      this.articleService.createArticle(this.articleModel).subscribe((response: boolean) => {
        if (response) {
          this.dialog.closeAll();
          this.openArticlePublishingSucceededSnackBar();
        } else {
          this.openArticlePublishingFailedSnackBar();
        }
      });
    }
  }

  initForm()
  {
    this.articleForm = new FormGroup({
      'title': new FormControl(null,[Validators.required, CustomValidators.WhitespaceInput]),
      'summary': new FormControl(null, [Validators.required, CustomValidators.SummaryLengthValidator, CustomValidators.WhitespaceInput]),
      'content': new FormControl(null, [Validators.required, CustomValidators.WhitespaceInputQuillEditor]),
      'titlePhotoContent': new FormControl(null, [Validators.required])
    });
  }

  // summaryLengthValidator(control: FormControl): { [s: string]: boolean } | null {
  //   if (control.value && control.value.trim().length > 200) {
  //     return { 'maxlengthExceeded': true };
  //   }
  //   return null;
  // }

  onPreviewClicked()
  {
    this.articleModel = this.articleForm.value;
    this.articleModel.content = this.articleContent;
    this.articleDto.title = this.articleModel.title;
    this.articleDto.content = this.articleModel.content;
    this.articleDto.titlePhotoContent = this.articleModel.titlePhotoContent;
    this.articleDto.authorName = this.authService.getUserName();
    this.dialog.open(ArticlePreviewComponent, {
      width: '80%',
      data: this.articleDto
    });
  }

  openArticlePublishingSucceededSnackBar() {
    this.snackBar.openSnackBar('Article has been published!','');
  }
  openArticlePublishingFailedSnackBar() {
    this.snackBar.openSnackBar('Article could not be published!','');
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
