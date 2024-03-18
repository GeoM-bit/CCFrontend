import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateArticleComponent} from "../create-article/create-article.component";
import {ArticleService} from "../../../core/services/article.service";
import {FeedArticleDto} from "../../../../models/feedArticleDto";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  articles: FeedArticleDto[] = [];
  onCreateArticleClick()
  {
    this.dialog.open(CreateArticleComponent);
  }

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles()
  {
    this.articleService.getArticles().subscribe((response: FeedArticleDto[]) => {
      response.forEach(x=>this.articles.push(x));
    });
  }
}
