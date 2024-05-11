import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ArticleModel} from "../../types/articleModel";

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public article: ArticleModel) { }
}
