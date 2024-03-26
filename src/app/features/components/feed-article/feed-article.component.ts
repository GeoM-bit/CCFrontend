import {Component, Input, OnInit} from '@angular/core';
import {FeedArticleDto} from "../../../../models/feedArticleDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed-article',
  templateUrl: './feed-article.component.html',
  styleUrl: './feed-article.component.css'
})
export class FeedArticleComponent implements OnInit{
  @Input() articleData: FeedArticleDto;
  constructor( private router: Router) {
  }

  ngOnInit(): void {
  }

  onFeedArticleClick(){
  this.router.navigate(['article', this.articleData.title]);
  }
}
