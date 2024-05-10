import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateArticleComponent} from "../create-article/create-article.component";
import {FeedArticleDto} from "../../../../models/feedArticleDto";
import {ArticleService} from "../../../core/services/article.service";
import {CreatePostComponent} from "../../posts/create-post/create-post.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  articles: FeedArticleDto[] = [];

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((response: FeedArticleDto[]) => {
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
