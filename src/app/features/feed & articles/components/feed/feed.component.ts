import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateArticleComponent} from "../create-article/create-article.component";
import {ArticleService} from "../../../../core/services/article.service";
import {FeedArticle} from "../../types/feedArticle";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  articles: FeedArticle[] = [];

  constructor(private dialog: MatDialog,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((response: FeedArticle[]) => {
      response.forEach(x=>this.articles.push(x));
    });
  }

  onCreateArticleClick() {
    const dialogRef: MatDialogRef<CreateArticleComponent> = this.dialog.open(CreateArticleComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.articles = [];
        this.getArticles();
      }
    });
  }
}
