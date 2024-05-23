import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleModel} from "../../types/articleModel";
import {ArticleService} from "../../../../core/services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  @Input() article: ArticleModel = new ArticleModel();
  constructor(private route: ActivatedRoute, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.article.id = params['id'];
        this.getArticle();
      }
    });
  }
  getArticle() {
    this.articleService.getArticleById(this.article.id).subscribe((response: ArticleModel) => {
      this.article = response;
    });
  }

  getDate():String{
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

     return yyyy + '-' + mm + '-' + dd;
  }
}
