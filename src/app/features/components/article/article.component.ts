import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../core/services/article.service";
import {ArticleDto} from "../../../../models/articleDto";

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
  getArticle()
  {
    this.articleService.getArticleByTitle(this.article).subscribe((response: ArticleDto) => {
      this.article = response;
    });
  }
}
