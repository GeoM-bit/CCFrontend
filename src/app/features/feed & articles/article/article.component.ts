import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleDto} from "../../../../models/articleDto";
import {ArticleService} from "../../../core/services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  @Input() article: ArticleDto = new ArticleDto();
  constructor(private route: ActivatedRoute, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['title'] != undefined) {
        this.article.title = params['title'];
        this.getArticle();
      }
    });
  }
  getArticle() {
    this.articleService.getArticleByTitle(this.article).subscribe((response: ArticleDto) => {
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
