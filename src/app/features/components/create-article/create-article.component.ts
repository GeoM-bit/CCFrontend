import {Component, OnInit} from '@angular/core';
import {EditorChangeContent, EditorChangeSelection} from "ngx-quill";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewArticleModel} from "../../../../models/newArticleModel";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {ArticleService} from "../../../core/services/article.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent implements OnInit{
  articleModel: NewArticleModel;
  articleForm: FormGroup;
  articleContent: string="";

  constructor(private articleService: ArticleService, private snackBar: SnackBarComponent,  private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    }
  changedEditor(event: EditorChangeContent | EditorChangeSelection)
  {
    this.articleContent = event['editor']['root']['innerHTML'];
  }

  onSubmit(){
    this.articleModel = this.articleForm.value;
    this.articleModel.content = this.articleContent;
    this.articleService.createArticle(this.articleModel).subscribe((response: boolean) => {
      if(response) {
        this.dialog.closeAll();
        this.openArticlePublishingSucceededSnackBar();
      }
      else {
        this.openArticlePublishingFailedSnackBar();
      }
    });
  }

  initForm()
  {
    this.articleForm = new FormGroup({
      'title': new FormControl(null,[Validators.required]),
      'content': new FormControl(null, [Validators.required])
    });
  }

  onPreviewClicked()
  {
    this.articleModel = this.articleForm.value;
    this.articleModel.content = this.articleContent;
    console.log(this.articleModel);
  }

  openArticlePublishingSucceededSnackBar() {
    this.snackBar.openSnackBar('Article has been published!','');
  }
  openArticlePublishingFailedSnackBar() {
    this.snackBar.openSnackBar('Article could not be published!','');
  }
}
