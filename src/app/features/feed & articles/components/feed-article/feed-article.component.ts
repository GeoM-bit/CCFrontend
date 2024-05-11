import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FeedArticle} from "../../types/feedArticle";

@Component({
  selector: 'app-feed-article',
  templateUrl: './feed-article.component.html',
  styleUrl: './feed-article.component.css'
})
export class FeedArticleComponent implements OnInit{
  @Input() articleData: FeedArticle;
  constructor( private router: Router) {
  }

  ngOnInit(): void {
  }

  onFeedArticleClick(){
    this.router.navigate(['article', this.articleData.title]);
  }
}
