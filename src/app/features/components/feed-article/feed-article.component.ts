import {Component, Input, OnInit} from '@angular/core';
import {FeedArticleDto} from "../../../../models/feedArticleDto";

@Component({
  selector: 'app-feed-article',
  templateUrl: './feed-article.component.html',
  styleUrl: './feed-article.component.css'
})
export class FeedArticleComponent implements OnInit{
  @Input() articleData: FeedArticleDto;
  htmlContent: String;
  constructor() {
  }

  ngOnInit(): void {
    this.htmlContent = this.articleData.summary;
  }

}
