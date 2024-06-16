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
  filteredArticles: FeedArticle[] = [];
  constructor(private dialog: MatDialog,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getArticles();
    }, 500);
  }

  getArticles() {
    this.articleService.getArticles().subscribe((response: FeedArticle[]) => {
      this.articles = response;
      this.filteredArticles = response;
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

  refreshArticle(articleId: String){
    const article = this.articles.find(article => article.id == articleId);
    if (article) {
      article.isFavorite = !article.isFavorite;
    }
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(filterValue) ||
      article.summary.toLowerCase().includes(filterValue)
    );
  }

  clearSearchInput(input: HTMLInputElement) {
    input.value = '';
    this.filteredArticles = this.articles;
  }
}
